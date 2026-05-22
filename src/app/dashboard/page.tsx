import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateWorkspaceCard from "@/components/CreateWorkspaceCard";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId! },
    include: {
      workspaces: {
        include: {
          workspace: true,
        },
      },
    },
  });

  const workspaces = user?.workspaces.map((m) => m.workspace) ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mis workspaces</h1>
        <p className="text-[#94a3b8]">Controla todos tus workspaces en un solo lugar</p>
      </div>
      {workspaces.length === 0 ? (
        <div className="rounded-lg border border-[#1e293b] bg-[#0f172a] p-12 text-center">
          <p className="text-[#94a3b8] mb-4">No workspaces yet</p>
          <CreateWorkspaceCard showAsButton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/dashboard/workspace/${workspace.id}`}
              className="group rounded-lg border border-[#1e293b] bg-[#0f172a] p-6 hover:border-[#0047ab] hover:bg-[#1a2642] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="font-semibold text-white group-hover:text-[#0047ab] transition-colors">{workspace.name}</h2>
                  <p className="text-sm text-[#94a3b8] mt-1">Open workspace</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e293b] group-hover:bg-[#0047ab] transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
          <CreateWorkspaceCard />
        </div>
      )}
    </div>
  );
}
