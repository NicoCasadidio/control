"use client";

import { useState } from "react";
import { deleteWorkspace } from "@/actions/workspace";

interface Props {
  workspaceId: string;
}

export default function DeleteWorkspaceButton({ workspaceId }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleClose() {
    setOpen(false);
    setValue("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors cursor-pointer"
      >
        Eliminar workspace
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-900">Eliminar workspace</h2>
            <p className="text-sm text-zinc-600">
              Esta acción es irreversible. Se eliminarán todas las tareas, comentarios y miembros asociados.
            </p>
            <p className="text-sm text-zinc-600">
              Escribí <span className="font-mono font-semibold text-zinc-900">DELETE WORKSPACE</span> para confirmar.
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="DELETE WORKSPACE"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={value !== "DELETE WORKSPACE"}
                onClick={() => deleteWorkspace(workspaceId)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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