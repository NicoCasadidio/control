import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Mis workspaces</h1>
      {workspaces.length === 0 ? (
        <p className="text-zinc-500">Todavía no tenés ningún workspace.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/dashboard/workspace/${workspace.id}`}
              className="rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-400 transition-colors"
            >
              <h2 className="font-medium text-zinc-900">{workspace.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}