"use client";

import { useState } from "react";
import Link from "next/link";
import { updateTaskStatus } from "@/actions/task";
import PriorityBadge from "@/components/PriorityBadge";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: Date | null;
  assignee: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Completado",
};

const statusColors: Record<string, string> = {
  pending: "bg-[#1e293b] text-[#cbd5e1]",
  in_progress: "bg-[#0047ab] text-white",
  done: "bg-[#10b981] text-white",
};

interface Props {
  task: Task;
  workspaceId: string;
}

export default function TaskCard({ task, workspaceId }: Props) {
  const [status, setStatus] = useState(task.status);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await updateTaskStatus(task.id, task.title, workspaceId, newStatus, );
  }

  return (
    <Link href={`/dashboard/workspace/${workspaceId}/task/${task.id}`}>
      <div className="group rounded-lg border border-[#1e293b] bg-[#0f172a] p-4 hover:border-[#0047ab] hover:bg-[#1a2642] transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white group-hover:text-[#0047ab] transition-colors truncate">{task.title}</p>
            {task.description && (
              <p className="text-sm text-[#94a3b8] mt-1 line-clamp-2">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {task.assignee && (
                <span className="text-xs bg-[#1e293b] text-[#cbd5e1] px-2 py-1 rounded">
                  {task.assignee.name || task.assignee.email}
                </span>
              )}
              {task.dueDate && (
                <span className="text-xs text-[#94a3b8]">
                  {new Date(task.dueDate).toLocaleDateString("es-AR")}
                </span>
              )}
              <PriorityBadge dueDate={task.dueDate} />
            </div>
          </div>
          <div onClick={(e) => e.preventDefault()} className="flex-shrink-0">
            <select
              value={status}
              onChange={(e) => {
                e.stopPropagation();
                handleStatusChange(e.target.value);
              }}
              className={`text-sm rounded-md px-3 py-1 outline-none border border-transparent transition-colors cursor-pointer font-medium ${statusColors[status]}`}
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Link>
  );
}