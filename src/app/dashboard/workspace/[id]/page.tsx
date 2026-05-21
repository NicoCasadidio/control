import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import MembersSection from "@/components/MemberSection"
import CreateTaskModal from "@/components/CreateTaskModal";
import WorkspaceNameEditor from "@/components/WorkspaceNameEditor";
import DeleteWorkspaceButton from "@/components/DeleteWorkspaceButton";
import LeaveWorkspaceButton from "@/components/LeaveWorkspaceButton";

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
          dueDate: { sort: "asc", nulls: "last" },
        },
        include: {
          assignee: true,
        },
      },
    },
  });

  if (!workspace) {
    redirect("/dashboard");
  }

  const isMember = workspace.members.some((m) => m.userId === user.id);
  const isAdmin = workspace.members.some((m) => m.userId === user.id && m.role === "admin");

  if (!isMember) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-6">
      <WorkspaceNameEditor
        workspaceId={id}
        initialName={workspace.name}
        isAdmin={isAdmin}
      />
      <MembersSection
        members={workspace.members}
        isAdmin={isAdmin}
        workspaceId={id}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-zinc-900">Tareas</h2>
          <CreateTaskModal
            workspaceId={id}
            members={workspace.members}
          />
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
      <div className="pt-4 border-t border-zinc-200">
        {isAdmin ? (
          <DeleteWorkspaceButton workspaceId={id} />
        ) : (
          <LeaveWorkspaceButton workspaceId={id} userId={user.id} />
        )}
      </div>
    </div>
  );
}