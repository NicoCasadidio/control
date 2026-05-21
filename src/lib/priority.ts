export type Priority = "high" | "medium" | "low" | null;

export function getPriority(dueDate: Date | null): Priority {
  if (!dueDate) return null;

  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 2) return "high";
  if (diffDays < 5) return "medium";
  return "low";
}