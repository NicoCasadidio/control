"use client";

import { useState } from "react";
import Link from "next/link";
import { updateTaskStatus } from "@/actions/task";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Completado",
};

interface Props {
  task: Task;
  workspaceId: string;
}

export default function TaskCard({ task, workspaceId }: Props) {
  const [status, setStatus] = useState(task.status);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await updateTaskStatus(task.id, newStatus);
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 flex items-start justify-between gap-4">
      <Link href={`/dashboard/workspace/${workspaceId}/task/${task.id}`} className="flex flex-col gap-1 hover:underline cursor-pointer">
        <p className="font-medium text-zinc-900">{task.title}</p>
        {task.description && (
          <p className="text-sm text-zinc-500">{task.description}</p>
        )}
      </Link>
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="text-sm border border-zinc-200 rounded-md px-2 py-1 outline-none"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}