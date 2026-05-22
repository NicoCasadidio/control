"use client";

import { useState } from "react";
import { deleteWorkspace } from "@/actions/workspace";
import { Trash2 } from "lucide-react";

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
        className="rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/50 px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
      >
        <Trash2 size={16} />
        Eliminar workspace
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Eliminar workspace</h2>
            <p className="text-sm text-[#cbd5e1]">
              Esta acción es irreversible. Se eliminarán todas las tareas, comentarios y miembros asociados.
            </p>
            <p className="text-sm text-[#94a3b8]">
              Escribí <span className="font-mono font-semibold text-white">DELETE WORKSPACE</span> para confirmar.
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="DELETE WORKSPACE"
              className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-red-600 transition-colors"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={value !== "DELETE WORKSPACE"}
                onClick={() => deleteWorkspace(workspaceId)}
                className="rounded-md bg-red-900/50 hover:bg-red-900 text-red-300 hover:text-red-200 px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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