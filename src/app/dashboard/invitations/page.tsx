import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import InvitationList from "@/components/InvitationList";

export default async function InvitationsPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) redirect("/");

  const invitations = await prisma.workspaceInvitation.findMany({
    where: { receiverId: user.id, status: "pending" },
    include: {
      workspace: true,
      sender: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Invitaciones pendientes</h1>
        <p className="text-[#94a3b8]">Manage your pending workspace invitations</p>
      </div>
      <InvitationList invitations={invitations} />
    </div>
  );
}