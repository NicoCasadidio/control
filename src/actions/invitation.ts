"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createActivity } from "@/lib/activity";
import { ActivityType } from "@/generated/prisma/client";
import { sendWorkspaceInvitationEmail } from "@/lib/email";

export async function sendInvitation(workspaceId: string, email: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { error: "No autenticado" };

  // buscar el usuario que esta invitando
  const sender = await prisma.user.findUnique({ where: { clerkId } });
  if (!sender) return { error: "Usuario no encontrado" };

  // verificar que el sender es admin del workspace
  const membership = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: sender.id, workspaceId } },
  });
  if (!membership || membership.role !== "admin") {
    return { error: "No tenés permisos para invitar usuarios" };
  }

  // buscar al usuario a invitar por email
  const receiver = await prisma.user.findUnique({ where: { email } });
  if (!receiver) return { error: "No existe un usuario con ese email" };

  // verificar que no sea ya miembro
  const alreadyMember = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: receiver.id, workspaceId } },
  });
  if (alreadyMember) return { error: "Este usuario ya es miembro del workspace" };

  // verificar que no tenga una invitacion pendiente
  const existingInvitation = await prisma.workspaceInvitation.findUnique({
    where: { workspaceId_receiverId: { workspaceId, receiverId: receiver.id } },
  });
  if (existingInvitation) return { error: "Este usuario ya tiene una invitación pendiente" };

  // obtener workspace para el nombre
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });
  if (!workspace) return { error: "Workspace no encontrado" };

  await prisma.workspaceInvitation.create({
    data: { workspaceId, senderId: sender.id, receiverId: receiver.id },
  });

  // enviar mail de invitación
  sendWorkspaceInvitationEmail(
    receiver.email!,
    sender.name || sender.email!,
    workspace.name
  );

  revalidatePath(`/dashboard/workspace/${workspaceId}`);
  return { success: true };
}

export async function acceptInvitation(invitationId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { error: "No autenticado" };

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return { error: "Usuario no encontrado" };

  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { id: invitationId },
  });
  if (!invitation || invitation.receiverId !== user.id) {
    return { error: "Invitación no válida" };
  }
  if (invitation.status !== "pending") {
    return { error: "Esta invitación ya fue procesada" };
  }

  // actualizar estado y crear membresia en una sola operacion
  await prisma.$transaction([
    prisma.workspaceInvitation.delete({
      where: { id: invitationId },
    }),
    prisma.workspaceMember.create({
      data: { userId: user.id, workspaceId: invitation.workspaceId, role: "member" },
    }),
  ]);

  await createActivity({
    workspaceId: invitation.workspaceId,
    actorId: user.id,
    type: ActivityType.MEMBER_JOINED,
  });
  
  revalidatePath("/dashboard");
  return { success: true };
}

export async function rejectInvitation(invitationId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { error: "No autenticado" };

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return { error: "Usuario no encontrado" };

  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { id: invitationId },
  });
  if (!invitation || invitation.receiverId !== user.id) {
    return { error: "Invitación no válida" };
  }
  if (invitation.status !== "pending") {
    return { error: "Esta invitación ya fue procesada" };
  }

  await prisma.workspaceInvitation.delete({
    where: { id: invitationId },
  });

  revalidatePath("/dashboard");
  return { success: true };
}