"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, LogOut } from "lucide-react";
import { deleteWorkspace } from "@/actions/workspace";
import { removeMember } from "@/actions/member";
import ConfirmModal from "@/components/ConfirmModal";

interface Props {
  workspaceId: string;
  isAdmin: boolean;
  userId: string;
}

export default function WorkspaceOptionsMenu({ workspaceId, isAdmin, userId }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCloseDelete() {
    setDeleteModalOpen(false);
    setDeleteValue("");
  }

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="text-[#64748b] hover:text-[#94a3b8] transition-colors cursor-pointer p-1 rounded"
          aria-label="Opciones del workspace"
        >
          <MoreVertical size={18} />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 top-full mt-1 w-52 bg-[#0f172a] border border-[#1e293b] rounded-lg shadow-lg z-50 py-1">
            {isAdmin ? (
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setDeleteModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
                Eliminar workspace
              </button>
            ) : (
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setLeaveModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Abandonar workspace
              </button>
            )}
          </div>
        )}
      </div>

      {deleteModalOpen && (
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
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              placeholder="DELETE WORKSPACE"
              className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-red-600 transition-colors"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCloseDelete}
                className="rounded-md px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deleteValue !== "DELETE WORKSPACE"}
                onClick={() => deleteWorkspace(workspaceId)}
                className="rounded-md bg-red-900/50 hover:bg-red-900 text-red-300 hover:text-red-200 px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {!isAdmin && (
        <ConfirmModal
          open={leaveModalOpen}
          onClose={() => setLeaveModalOpen(false)}
          title="Abandonar workspace"
          message="¿Seguro que quieres abandonar este workspace? Perderás acceso a todas tus tareas."
          confirmLabel="Abandonar"
          onConfirm={() => removeMember(userId, workspaceId)}
        />
      )}
    </>
  );
}
