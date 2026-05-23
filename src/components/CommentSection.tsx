"use client";

import { useState, useRef } from "react";
import { createComment, deleteComment } from "@/actions/comment";
import ConfirmModal from "@/components/ConfirmModal";
import { Trash2 } from "lucide-react";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  user: { id: string; name: string | null };
};

type Props = {
  comments: Comment[];
  taskId: string;
  workspaceId: string;
  currentUserId: string;
  taskTitle: string;
};

export default function CommentSection({ comments, taskId, workspaceId, currentUserId, taskTitle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const action = createComment.bind(null, taskId, workspaceId, taskTitle);

  async function handleSubmit(formData: FormData) {
    await action(formData);
    formRef.current?.reset();
  }

  async function handleDeleteConfirm() {
    if (!deleteCommentId) return;
    await deleteComment(deleteCommentId, taskId, workspaceId);
    setDeleteCommentId(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-white">Comentarios</h2>

      {comments.length === 0 ? (
        <p className="text-[#94a3b8]">Sin comentarios aún</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-white">{comment.user.name ?? "Usuario"}</p>
                  <p className="text-xs text-[#64748b]">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
                {comment.user.id === currentUserId && (
                  <button
                    className="text-[#64748b] hover:text-red-400 transition-colors cursor-pointer p-1"
                    onClick={() => setDeleteCommentId(comment.id)}
                    title="Borrar comentario"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-[#cbd5e1] whitespace-pre-wrap">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-[#1e293b] pt-6">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="content" className="text-sm font-medium text-[#cbd5e1]">
            Agregar comentario
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Escribí un comentario..."
            required
            rows={4}
            className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors resize-none"
          />
          <button
            type="submit"
            className="self-end rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
          >
            Comentar
          </button>
        </form>
      </div>

      <ConfirmModal
        open={deleteCommentId !== null}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={handleDeleteConfirm}
        title="Borrar comentario"
        message="¿Seguro que querés borrar este comentario?"
        confirmLabel="Borrar"
      />
    </div>
  );
}