import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MyTaskCard from "@/components/MyTaskCard";

export default async function MyTasksPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });
  if (!user) redirect("/");

  const tasks = await prisma.task.findMany({
    where: { assigneeId: user.id },
    include: { workspace: true },
    orderBy: [{ dueDate: { sort: "asc", nulls: "last" } }],
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mis tareas</h1>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground">No tenés tareas asignadas.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <MyTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}