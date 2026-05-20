"use client";

import { useRef } from "react";
import { createComment, deleteComment } from "@/actions/comment";

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
  const action = createComment.bind(null, taskId, workspaceId);

  async function handleSubmit(formData: FormData) {
    await action(formData);
    formRef.current?.reset();
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
              <button onClick={() => deleteComment(comment.id, taskId, workspaceId)}>
                Borrar
              </button>
            )}
          </li>
        ))}
      </ul>

      <form ref={formRef} action={handleSubmit}>
        <textarea name="content" placeholder="Escribí un comentario..." required />
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
}