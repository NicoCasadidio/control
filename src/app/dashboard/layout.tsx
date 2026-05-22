import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020617]">
      <aside className="w-64 border-r border-[#1e293b] bg-[#0f172a] px-6 py-8 flex flex-col gap-8 sticky top-0 h-screen">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#0047ab] rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">C</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            CONTROL
          </span>
        </Link>
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer"
          >
            Mis workspaces
          </Link>
          <Link
            href="/dashboard/workspace/new"
            className="rounded-md px-3 py-2 text-sm text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer"
          >
            Crear workspace
          </Link>
          <Link
            href="/dashboard/invitations"
            className="rounded-md px-3 py-2 text-sm text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer"
          >
            Invitaciones
          </Link>
        </nav>
        <div className="mt-auto flex items-center gap-3">
          <UserButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}