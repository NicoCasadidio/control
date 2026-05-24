import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import MembersSection from "@/components/MemberSection"
import CreateTaskModal from "@/components/CreateTaskModal";
import WorkspaceNameEditor from "@/components/WorkspaceNameEditor";
import WorkspaceOptionsMenu from "@/components/WorkspaceOptionsMenu";
import ActivityFeed from "@/components/ActivityFeed";
import SearchAndFilterBar from "@/components/SearchAndFilterBar";
import { getPriority } from "@/lib/priority";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search?: string; status?: string; priority?: string }>;
}

export default async function WorkspacePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId! },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const { search: searchQuery = "", status: statusParam, priority: priorityParam } = await searchParams;
  const searchTrimmed = searchQuery.trim();
  const statusFilter = statusParam?.split(",").filter(Boolean) ?? [];
  const priorityFilter = priorityParam?.split(",").filter(Boolean) ?? [];

  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      tasks: {
        where: {
          ...(searchTrimmed && {
            title: { contains: searchTrimmed, mode: "insensitive" },
          }),
          ...(statusFilter.length > 0 && {
            status: { in: statusFilter },
          }),
        },
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

  const filteredTasks = priorityFilter.length > 0
    ? workspace.tasks.filter((task) => {
        const p = getPriority(task.dueDate) ?? "none";
        return priorityFilter.includes(p);
      })
    : workspace.tasks;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const activities = await prisma.activity.findMany({
    where: {
      workspaceId: workspace.id,
      createdAt: { gte: sevenDaysAgo },
    },
    include: {
      actor: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <WorkspaceNameEditor
              workspaceId={id}
              initialName={workspace.name}
              isAdmin={isAdmin}
            />
            <WorkspaceOptionsMenu
              workspaceId={id}
              isAdmin={isAdmin}
              userId={user.id}
            />
          </div>
          <CreateTaskModal
            workspaceId={id}
            members={workspace.members}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Tareas</h2>
            <SearchAndFilterBar />
            {filteredTasks.length === 0 ? (
              <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-12 text-center">
                <p className="text-[#94a3b8] mb-4">No hay tareas todavía</p>
                <p className="text-sm text-[#64748b]">Crea tu primera tarea para comenzar</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} workspaceId={id} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Miembros</h3>
            <MembersSection
              members={workspace.members}
              isAdmin={isAdmin}
              workspaceId={id}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-6 flex flex-col h-[650px]">
            <h3 className="text-lg font-semibold text-white mb-4 flex-shrink-0">Actividad reciente</h3>
            <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1e293b] [&::-webkit-scrollbar-thumb]:rounded-full">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}