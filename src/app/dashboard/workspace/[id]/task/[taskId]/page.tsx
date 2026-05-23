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
    <div className="flex flex-col gap-8 max-w-4xl">
      <Link href={`/dashboard/workspace/${workspaceId}`} className="text-sm text-[#0047ab] hover:text-[#0037a3] transition-colors">
        ← Volver al workspace
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold text-white mb-4">{task.title}</h1>
          {task.description && (
            <p className="text-[#cbd5e1] mb-6 whitespace-pre-wrap">{task.description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-4">
          <p className="text-[#64748b] text-sm mb-2">Estado</p>
          <p className="text-white font-semibold capitalize">{task.status === 'pending' ? 'Pendiente' : task.status === 'in_progress' ? 'En progreso' : 'Completado'}</p>
        </div>

        {task.assignee && (
          <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-4">
            <p className="text-[#64748b] text-sm mb-2">Asignado a</p>
            <p className="text-white font-semibold">{task.assignee.name || task.assignee.email}</p>
          </div>
        )}

        {task.dueDate && (
          <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-4">
            <p className="text-[#64748b] text-sm mb-2">Fecha límite</p>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold">
                {new Date(task.dueDate).toLocaleDateString("es-AR")}
              </p>
              <PriorityBadge dueDate={task.dueDate} />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#1e293b] pt-8">
        <CommentSection
          comments={task.comments}
          taskId={task.id}
          workspaceId={workspaceId}
          currentUserId={user.id}
          taskTitle={task.title}
        />
      </div>

      {isAdmin && (
        <div className="flex gap-2 pt-4">
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