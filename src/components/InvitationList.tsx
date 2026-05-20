"use client";

import { acceptInvitation, rejectInvitation } from "@/actions/invitation";

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
    return <p>No tenés invitaciones pendientes.</p>;
  }

  return (
    <ul>
      {invitations.map((inv) => (
        <li key={inv.id}>
          <p>Workspace: {inv.workspace.name}</p>
          <p>Invitado por: {inv.sender.name ?? inv.sender.email}</p>
          <p>Fecha: {inv.createdAt.toLocaleDateString()}</p>
          <button onClick={() => acceptInvitation(inv.id)}>Aceptar</button>
          <button onClick={() => rejectInvitation(inv.id)}>Rechazar</button>
        </li>
      ))}
    </ul>
  );
}