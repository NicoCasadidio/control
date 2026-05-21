"use client";

import { useState } from "react";
import { removeMember } from "@/actions/member";

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
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        Remover miembro
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-900">Remover miembro</h2>

            {nonAdmins.length === 0 ? (
              <p className="text-sm text-zinc-500">No hay miembros para remover.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {nonAdmins.map((m) => (
                  <label
                    key={m.userId}
                    className="flex items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 cursor-pointer hover:bg-zinc-50"
                  >
                    <input
                      type="radio"
                      name="member"
                      value={m.userId}
                      checked={selectedId === m.userId}
                      onChange={() => setSelectedId(m.userId)}
                    />
                    <span className="text-sm text-zinc-800">
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
                className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
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
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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