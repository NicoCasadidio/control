import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MyTasksClient from "@/components/MyTasksClient";

interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
  }>;
}

export default async function MyTasksPage({ searchParams }: Props) {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) redirect("/");

  const params = await searchParams;
  const searchQuery = params.search?.trim() ?? "";
  const statusFilter = params.status?.split(",").filter(Boolean) ?? [];
  const priorityFilter = params.priority?.split(",").filter(Boolean) ?? [];

  const tasks = await prisma.task.findMany({
    where: {
      assigneeId: user.id,
      ...(searchQuery && {
        title: { contains: searchQuery, mode: "insensitive" },
      }),
      ...(statusFilter.length > 0 && {
        status: { in: statusFilter },
      }),
    },
    include: { workspace: true },
    orderBy: [{ dueDate: { sort: "asc", nulls: "last" } }],
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mis tareas</h1>
      <MyTasksClient
        tasks={tasks}
        priorityFilter={priorityFilter}
        defaultSearch={searchQuery}
      />
    </div>
  );
}
