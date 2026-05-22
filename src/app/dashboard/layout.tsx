"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isWorkspacesActive =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/workspace");
  const isInvitationsActive = pathname === "/dashboard/invitations";

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e293b] bg-[#0f172a] h-16">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: App Name */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-8 h-8 bg-[#0047ab] rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:inline">
              CONTROL
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isWorkspacesActive
                  ? "text-[#0047ab] bg-[#0047ab]/10"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              Mis workspaces
            </Link>
            <Link
              href="/dashboard/invitations"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isInvitationsActive
                  ? "text-[#0047ab] bg-[#0047ab]/10"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              Invitaciones
            </Link>
          </nav>

          {/* Right: User Button */}
          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0f172a] border-b border-[#1e293b] flex flex-col">
          <Link
            href="/dashboard"
            className={`rounded-md mx-4 my-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              isWorkspacesActive
                ? "text-[#0047ab] bg-[#0047ab]/10"
                : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
            }`}
          >
            Mis workspaces
          </Link>
          <Link
            href="/dashboard/invitations"
            className={`rounded-md mx-4 mb-4 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              isInvitationsActive
                ? "text-[#0047ab] bg-[#0047ab]/10"
                : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
            }`}
          >
            Invitaciones
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
