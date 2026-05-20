"use client";

import { useState, useRef } from "react";
import { sendInvitation } from "@/actions/invitation";

type Member = {
  id: string;
  role: string;
  user: { name: string | null; email: string };
};

type Props = {
  members: Member[];
  isAdmin: boolean;
  workspaceId: string;
};

export default function MembersSection({ members, isAdmin, workspaceId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleInvite(formData: FormData) {
    const email = formData.get("email") as string;
    setError(null);
    setSuccess(false);

    const result = await sendInvitation(workspaceId, email);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      formRef.current?.reset();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-zinc-900">Miembros</h2>
        {isAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            + Invitar
          </button>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {members.map((m) => (
          <li key={m.id} className="text-sm text-zinc-700">
            {m.user.name ?? m.user.email}{" "}
            <span className="text-zinc-400">({m.role})</span>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4 w-full max-w-sm">
            <h3 className="text-lg font-medium text-zinc-900">Invitar usuario</h3>

            <form ref={formRef} action={handleInvite} className="flex flex-col gap-3">
              <input
                name="email"
                type="email"
                placeholder="Email del usuario"
                required
                className="border border-zinc-300 rounded-md px-3 py-2 text-sm"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">Invitación enviada.</p>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setError(null); setSuccess(false); }}
                  className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}