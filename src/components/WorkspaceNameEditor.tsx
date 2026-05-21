"use client";

import { useState, useRef } from "react";
import { Pencil, Check, X } from "lucide-react";
import { updateWorkspace } from "@/actions/workspace";

interface Props {
  workspaceId: string;
  initialName: string;
  isAdmin: boolean;
}

export default function WorkspaceNameEditor({ workspaceId, initialName, isAdmin }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(formData: FormData) {
    const newName = formData.get("name") as string;
    if (!newName || newName.trim() === "") return;
    await updateWorkspace(workspaceId, formData);
    setName(newName.trim());
    setEditing(false);
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
        <h1 className="text-2xl font-semibold text-zinc-900">{name}</h1>
        {isAdmin && (
          <button
            onClick={() => setEditing(true)}
            className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        name="name"
        defaultValue={name}
        onKeyDown={handleKeyDown}
        autoFocus
        className="text-2xl font-semibold text-zinc-900 border-b-2 border-zinc-400 focus:border-zinc-900 outline-none bg-transparent"
      />
      <button type="submit" className="text-green-600 hover:text-green-500 transition-colors cursor-pointer">
        <Check size={16} />
      </button>
      <button type="button" onClick={handleCancel} className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer">
        <X size={16} />
      </button>
    </form>
  );
}