"use client";

import { useState } from "react";
import { deleteTask } from "@/actions/task";

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

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-900">Eliminar tarea</h2>
            <p className="text-sm text-zinc-600">¿Estás seguro que querés eliminar esta tarea? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => deleteTask(taskId, workspaceId)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}