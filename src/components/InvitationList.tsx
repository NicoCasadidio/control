"use client";

import { acceptInvitation, rejectInvitation } from "@/actions/invitation";
import { Check, X } from "lucide-react";

type Invitation = {
  id: string;
  createdAt: Date;
  workspace: { name: string };
  sender: { name: string | null; email: string };
};

type Props = {
  invitations: Invitation[];
};

export default function InvitationList({ invitations }: Props) {
  if (invitations.length === 0) {
    return (
      <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-12 text-center">
        <p className="text-[#94a3b8]">No tenés invitaciones pendientes</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {invitations.map((inv) => (
        <li key={inv.id} className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-white">{inv.workspace.name}</h3>
              <p className="text-sm text-[#94a3b8] mt-1">
                Invitado por {inv.sender.name ?? inv.sender.email}
              </p>
              <p className="text-xs text-[#64748b] mt-2">
                {inv.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => acceptInvitation(inv.id)}
                className="rounded-md bg-green-900/50 hover:bg-green-900 text-green-300 hover:text-green-200 p-2 transition-colors cursor-pointer"
                title="Aceptar"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => rejectInvitation(inv.id)}
                className="rounded-md bg-red-900/50 hover:bg-red-900 text-red-300 hover:text-red-200 p-2 transition-colors cursor-pointer"
                title="Rechazar"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}