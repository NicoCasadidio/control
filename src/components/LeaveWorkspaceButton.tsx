"use client";

import { useState } from "react";
import { removeMember } from "@/actions/member";
import ConfirmModal from "@/components/ConfirmModal";

interface Props {
  workspaceId: string;
  userId: string;
}

export default function LeaveWorkspaceButton({ userId, workspaceId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-zinc-700 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-600 transition-colors cursor-pointer"
      >
        Abandonar workspace
      </button>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        title="Abandonar workspace"
        message="¿Seguro que quieres abandonar este workspace? Perderás acceso a todas tus tareas."
        confirmLabel="Abandonar"
        onConfirm={() => removeMember(userId, workspaceId)}
      />
    </>
  );
}