"use client";

import { getPriority } from "@/lib/priority";
import MyTaskCard from "@/components/MyTaskCard";
import SearchAndFilterBar from "@/components/SearchAndFilterBar";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: Date | null;
  workspace: { id: string; name: string };
}

interface Props {
  tasks: Task[];
  priorityFilter: string[];
  defaultSearch: string;
}

export default function MyTasksClient({
  tasks,
  priorityFilter,
  defaultSearch,
}: Props) {
  const filtered =
    priorityFilter.length === 0
      ? tasks
      : tasks.filter((task) => {
          const p = getPriority(task.dueDate) ?? "none";
          return priorityFilter.includes(p);
        });

  return (
    <>
      <SearchAndFilterBar />
      {filtered.length === 0 ? (
        <p className="text-[#94a3b8]">No hay tareas que coincidan con los filtros.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <MyTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}
