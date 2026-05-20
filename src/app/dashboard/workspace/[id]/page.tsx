import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkspacePage({ params }: Props) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId! },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      tasks: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!workspace) {
    redirect("/dashboard");
  }

  const isMember = workspace.members.some((m) => m.userId === user.id);

  if (!isMember) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-zinc-900">{workspace.name}</h1>
      <p className="text-sm text-zinc-500">
        {workspace.members.length} miembro(s)
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-zinc-900">Tareas</h2>
          <Link
            href={`/dashboard/workspace/${id}/task/new`}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            + Nueva tarea
          </Link>
        </div>
        {workspace.tasks.length === 0 ? (
          <p className="text-sm text-zinc-500">Todavía no hay tareas en este workspace.</p>
        ) : (
          <div className="flex flex-col gap-2">
          {workspace.tasks.map((task) => (
            <TaskCard key={task.id} task={task} workspaceId={id} />
          ))}
          </div>
        )}
      </div>
    </div>
  );
}