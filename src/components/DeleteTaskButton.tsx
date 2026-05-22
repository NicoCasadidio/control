"use client";

import { useState } from "react";
import { deleteTask } from "@/actions/task";
import ConfirmModal from "@/components/ConfirmModal";
import { Trash2 } from "lucide-react";

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
        className="rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/50 px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
      >
        <Trash2 size={16} />
        Eliminar
      </button>
      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteTask(taskId, workspaceId)}
        title="Eliminar tarea"
        message="¿Estás seguro que querés eliminar esta tarea? Esta acción no se puede deshacer."
        confirmLabel="Eliminar tarea"
      />
    </>
  );
}