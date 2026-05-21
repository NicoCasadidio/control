import { getPriority } from "@/lib/priority";

const config = {
  high:   { label: "Alta",  className: "bg-red-100 text-red-700" },
  medium: { label: "Media", className: "bg-yellow-100 text-yellow-700" },
  low:    { label: "Baja",  className: "bg-green-100 text-green-700" },
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