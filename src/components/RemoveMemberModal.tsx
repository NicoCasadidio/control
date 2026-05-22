"use client";

import { useState } from "react";
import { removeMember } from "@/actions/member";
import { Trash2 } from "lucide-react";

interface Member {
  userId: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Props {
  workspaceId: string;
  members: Member[];
}

export default function RemoveMemberModal({ workspaceId, members }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const nonAdmins = members.filter((m) => m.role !== "admin");

  function handleClose() {
    setOpen(false);
    setSelectedId("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/50 px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
      >
        <Trash2 size={16} />
        Remover
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Remover miembro</h2>

            {nonAdmins.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">No hay miembros para remover.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {nonAdmins.map((m) => (
                  <label
                    key={m.userId}
                    className="flex items-center gap-3 rounded-md border border-[#1e293b] bg-[#1a2642] hover:border-[#0047ab] px-3 py-2 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="member"
                      value={m.userId}
                      checked={selectedId === m.userId}
                      onChange={() => setSelectedId(m.userId)}
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-white">
                      {m.user.name ?? m.user.email}
                    </span>
                  </label>
                ))}
              </div>
            )}

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
                disabled={!selectedId}
                onClick={async () => {
                  await removeMember(selectedId, workspaceId);
                  setSelectedId("");
                }}
                className="rounded-md bg-red-900/50 hover:bg-red-900 text-red-300 hover:text-red-200 px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}