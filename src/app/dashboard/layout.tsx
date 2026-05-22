"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkspacesActive =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/workspace");
  const isInvitationsActive = pathname === "/dashboard/invitations";
  const isMyTasksActive = pathname === "/dashboard/my-tasks";

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
            <Link
              href="/dashboard/my-tasks"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isMyTasksActive
                  ? "text-[#0047ab] bg-[#0047ab]/10"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              Mis tareas
            </Link>
          </nav>

          {/* Right: User Button + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-[#cbd5e1] hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <UserButton />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0f172a] border-b border-[#1e293b] flex flex-col">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
              className={`rounded-md mx-4 mb-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isInvitationsActive
                  ? "text-[#0047ab] bg-[#0047ab]/10"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              Invitaciones
            </Link>
            <Link
              href="/dashboard/my-tasks"
              onClick={() => setMenuOpen(false)}
              className={`rounded-md mx-4 mb-4 px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isMyTasksActive
                  ? "text-[#0047ab] bg-[#0047ab]/10"
                  : "text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              Mis tareas
            </Link>
          </div>
        )}
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