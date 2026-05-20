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
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">Invitaciones pendientes</h1>
      <InvitationList invitations={invitations} />
    </div>
  );
}