"use client";

import { useState } from "react";
import { removeMember } from "@/actions/member";
import ConfirmModal from "@/components/ConfirmModal";
import { LogOut } from "lucide-react";

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
        className="rounded-md bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
      >
        <LogOut size={16} />
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