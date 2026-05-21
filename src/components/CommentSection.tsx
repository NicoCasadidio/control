"use client";

import { useState, useRef } from "react";
import { createComment, deleteComment } from "@/actions/comment";
import ConfirmModal from "@/components/ConfirmModal";

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
};

export default function CommentSection({ comments, taskId, workspaceId, currentUserId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const action = createComment.bind(null, taskId, workspaceId);

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
    <div>
      <h2>Comentarios</h2>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <span>{comment.user.name ?? "Usuario"}</span>
            <span>{comment.content}</span>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
            {comment.user.id === currentUserId && (
              <button
                className="cursor-pointer"
                onClick={() => setDeleteCommentId(comment.id)}
              >
                Borrar
              </button>
            )}
          </li>
        ))}
      </ul>

      <form ref={formRef} action={handleSubmit}>
        <textarea name="content" placeholder="Escribí un comentario..." required />
        <button type="submit" className="cursor-pointer">Comentar</button>
      </form>

      <ConfirmModal
        open={deleteCommentId !== null}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={handleDeleteConfirm}
        title="Borrar comentario"
        message="¿Seguro que querés borrar este comentario?"
      />
    </div>
  );
}