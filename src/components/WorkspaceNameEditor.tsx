"use client";

import { useState, useTransition } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { updateWorkspace } from "@/actions/workspace";

interface Props {
  workspaceId: string;
  initialName: string;
  isAdmin: boolean;
}

export default function WorkspaceNameEditor({ workspaceId, initialName, isAdmin }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const newName = formData.get("name") as string;
    if (!newName || newName.trim() === "") return;
    const prevName = name;
    startTransition(async () => {
      try {
        await updateWorkspace(workspaceId, formData);
        setName(newName.trim());
        setEditing(false);
      } catch {
        setName(prevName);
        setEditing(false);
      }
    });
  }

  function handleCancel() {
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") handleCancel();
  }

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        {isAdmin && (
          <button
            onClick={() => setEditing(true)}
            className="text-[#64748b] hover:text-[#94a3b8] transition-colors cursor-pointer p-1"
          >
            <Pencil size={18} />
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex items-center gap-2">
      <input
        name="name"
        defaultValue={name}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        autoFocus
        className="text-3xl font-bold text-white border-b-2 border-[#0047ab] focus:border-[#0047ab] outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {isPending ? (
        <Loader2 size={18} className="animate-spin text-[#0047ab]" />
      ) : (
        <>
          <button type="submit" className="text-green-500 hover:text-green-400 transition-colors cursor-pointer p-1">
            <Check size={18} />
          </button>
          <button type="button" onClick={handleCancel} className="text-[#64748b] hover:text-[#94a3b8] transition-colors cursor-pointer p-1">
            <X size={18} />
          </button>
        </>
      )}
    </form>
  );
}