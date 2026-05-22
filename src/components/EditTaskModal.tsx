"use client";

import { useState } from "react";
import { updateTask } from "@/actions/task";
import { Edit2 } from "lucide-react";

interface Member {
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Props {
  taskId: string;
  workspaceId: string;
  title: string;
  description: string | null;
  assigneeId: string | null;
  dueDate: Date | null;
  members: Member[];
}

export default function EditTaskModal({
  taskId,
  workspaceId,
  title,
  description,
  assigneeId,
  dueDate,
  members,
}: Props) {
  const [open, setOpen] = useState(false);
  const updateTaskWithIds = updateTask.bind(null, taskId, workspaceId);

  const formattedDueDate = dueDate
    ? new Date(dueDate).toISOString().split("T")[0]
    : "";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateTaskWithIds(formData);
    setOpen(false);
    }


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-[#0047ab]/20 text-[#0047ab] hover:bg-[#0047ab]/30 px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
      >
        <Edit2 size={16} />
        Editar
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Editar tarea</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-medium text-[#cbd5e1]">
                  Título
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={title}
                  className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-[#cbd5e1]">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={description ?? ""}
                  className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#0047ab] transition-colors resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="assigneeId" className="text-sm font-medium text-[#cbd5e1]">
                  Asignar a
                </label>
                <select
                  id="assigneeId"
                  name="assigneeId"
                  defaultValue={assigneeId ?? ""}
                  className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white outline-none focus:border-[#0047ab] transition-colors cursor-pointer"
                >
                  <option value="">Sin asignar</option>
                  {members.map((m) => (
                    <option key={m.userId} value={m.user.id}>
                      {m.user.name || m.user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium text-[#cbd5e1]">
                  Fecha límite
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  defaultValue={formattedDueDate}
                  className="rounded-md border border-[#1e293b] bg-[#1a2642] px-3 py-2 text-sm text-white outline-none focus:border-[#0047ab] transition-colors"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#0047ab] hover:bg-[#0037a3] px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}