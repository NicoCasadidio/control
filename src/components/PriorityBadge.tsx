import { getPriority } from "@/lib/priority";

const config = {
  high:   { label: "Alta",  className: "bg-red-900 text-red-200" },
  medium: { label: "Media", className: "bg-amber-900 text-amber-200" },
  low:    { label: "Baja",  className: "bg-emerald-900 text-emerald-200" },
};

interface Props {
  dueDate: Date | null;
}

export default function PriorityBadge({ dueDate }: Props) {
  const priority = getPriority(dueDate);

  if (!priority) return null;

  const { label, className } = config[priority];

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}