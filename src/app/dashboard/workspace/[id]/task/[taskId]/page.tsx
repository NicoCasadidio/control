import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import EditTaskModal from "@/components/EditTaskModal";
import PriorityBadge from "@/components/PriorityBadge";

type Props = {
  params: Promise<{ id: string; taskId: string }>;
};

export default async function TaskPage({ params }: Props) {
  const { id: workspaceId, taskId } = await params;

  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) redirect("/");

  const member = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId: user.id },
  });
  if (!member) redirect("/dashboard");

  const isAdmin = member.role === "admin";

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignee: true,
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: true },
      },
    },
  });

  if (!task) redirect("/dashboard");

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: { user: true },
  });

  return (
    <div>
      <Link href={`/dashboard/workspace/${workspaceId}`} className="text-sm text-zinc-500 hover:underline">
        Volver al workspace
      </Link>
      <h1>{task.title}</h1>
      {task.description && <p>{task.description}</p>}
      <p>Estado: {task.status}</p>
      {task.assignee && (
        <p>Asignado a: {task.assignee.name || task.assignee.email}</p>
      )}
      <div className="flex items-center gap-2">
        {task.dueDate && (
          <p>Fecha límite: {new Date(task.dueDate).toLocaleDateString("es-AR")}</p>
        )}
        <PriorityBadge dueDate={task.dueDate} />
      </div>
      <CommentSection
        comments={task.comments}
        taskId={task.id}
        workspaceId={workspaceId}
        currentUserId={user.id}
      />
      {isAdmin && (
        <div className="flex gap-2">
          <EditTaskModal
            taskId={task.id}
            workspaceId={workspaceId}
            title={task.title}
            description={task.description}
            assigneeId={task.assigneeId}
            dueDate={task.dueDate}
            members={members}
          />
          <DeleteTaskButton
            taskId={task.id}
            workspaceId={workspaceId}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </div>
  );
}