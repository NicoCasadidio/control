"use client";

import { useState } from "react";
import { deleteTask } from "@/actions/task";
import ConfirmModal from "@/components/ConfirmModal";

interface Props {
  taskId: string;
  workspaceId: string;
  isAdmin: boolean;
}

export default function DeleteTaskButton({ taskId, workspaceId, isAdmin }: Props) {
  const [open, setOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors cursor-pointer"
      >
        Eliminar tarea
      </button>
      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteTask(taskId, workspaceId)}
        title="Eliminar tarea"
        message="¿Estás seguro que querés eliminar esta tarea? Esta acción no se puede deshacer."
      />
    </>
  );
}