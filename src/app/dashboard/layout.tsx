import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-zinc-200 bg-white px-4 py-6 flex flex-col gap-6">
        <span className="text-xl font-bold tracking-tight text-zinc-900">
          CONTROL
        </span>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            Mis workspaces
          </Link>
          <Link
            href="/dashboard/workspace/new"
            className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            + Crear workspace
          </Link>
          <Link
            href="/dashboard/invitations"
            className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            Invitaciones
          </Link>
        </nav>
        <div className="mt-auto flex items-center gap-3">
          <UserButton />
        </div>
      </aside>
      <main className="flex-1 bg-zinc-50 p-8">
        {children}
      </main>
    </div>
  );
}