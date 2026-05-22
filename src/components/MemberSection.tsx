"use client";

import { useState, useRef } from "react";
import { sendInvitation } from "@/actions/invitation";
import RemoveMemberModal from "@/components/RemoveMemberModal";
import { UserPlus } from "lucide-react";

type Member = {
  id: string;
  userId: string;
  role: string;
  user: { id: string; name: string | null; email: string };
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#94a3b8]">{members.length} miembros</span>
        {isAdmin && (
          <div className="flex gap-2">
            <RemoveMemberModal workspaceId={workspaceId} members={members} />
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] text-white text-sm px-3 py-2 transition-colors cursor-pointer flex items-center gap-2 font-medium"
            >
              <UserPlus size={16} />
              Invitar
            </button>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {members.map((m) => (
          <li key={m.id} className="flex items-center justify-between text-sm">
            <span className="text-white">{m.user.name ?? m.user.email}</span>
            <span className="text-[#64748b] text-xs bg-[#1e293b] px-2 py-1 rounded">{m.role}</span>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 flex flex-col gap-4 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-white">Invitar usuario</h3>

            <form ref={formRef} action={handleInvite} className="flex flex-col gap-3">
              <input
                name="email"
                type="email"
                placeholder="Email del usuario"
                required
                className="border border-[#1e293b] bg-[#1a2642] rounded-md px-3 py-2 text-sm text-white placeholder-[#64748b] focus:border-[#0047ab] outline-none transition-colors"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">Invitación enviada.</p>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setError(null); setSuccess(false); }}
                  className="px-3 py-2 text-sm text-[#cbd5e1] hover:text-white cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-3 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
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