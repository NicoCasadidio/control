import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";

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

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: true },
      },
    },
  });

  if (!task) redirect("/dashboard");

  return (
    <div>
      <Link href={`/dashboard/workspace/${workspaceId}`} className="text-sm text-zinc-500 hover:underline">
        ← Volver al workspace
      </Link>
      <h1>{task.title}</h1>
      {task.description && <p>{task.description}</p>}
      <p>Estado: {task.status}</p>

      <CommentSection
        comments={task.comments}
        taskId={task.id}
        workspaceId={workspaceId}
        currentUserId={user.id}
      />
    </div>
  );
}