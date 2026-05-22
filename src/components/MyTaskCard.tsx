import Link from "next/link";
import PriorityBadge from "@/components/PriorityBadge";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: Date | null;
  workspace: {
    id: string;
    name: string;
  };
}

interface Props {
  task: Task;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Completado",
};

export default function MyTaskCard({ task }: Props) {
  return (
    <Link href={`/dashboard/workspace/${task.workspace.id}/task/${task.id}`}>
      <div className="group rounded-lg border border-[#1e293b] bg-[#0f172a] p-4 hover:border-[#0047ab] hover:bg-[#1a2642] transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white group-hover:text-[#0047ab] transition-colors truncate">
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-[#94a3b8] mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-xs bg-[#1e293b] text-[#cbd5e1] px-2 py-1 rounded">
                {task.workspace.name}
              </span>
              {task.dueDate && (
                <span className="text-xs text-[#94a3b8]">
                  {new Date(task.dueDate).toLocaleDateString("es-AR")}
                </span>
              )}
              <PriorityBadge dueDate={task.dueDate} />
            </div>
          </div>
          <span className="text-xs text-[#94a3b8] flex-shrink-0">
            {statusLabels[task.status]}
          </span>
        </div>
      </div>
    </Link>
  );
}