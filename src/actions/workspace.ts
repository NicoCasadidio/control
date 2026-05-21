"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function createWorkspace(formData: FormData) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    redirect("/sign-in");
  }

  await prisma.workspace.create({
    data: {
      name: name.trim(),
      members: {
        create: {
          userId: user.id,
          role: "admin",
        },
      },
    },
  });

  redirect("/dashboard");
}

export async function updateWorkspace(workspaceId: string, formData: FormData) {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const name = formData.get("name") as string;

  if (!name || name.trim() === "") return;

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) redirect("/sign-in");

  const member = await prisma.workspaceMember.findFirst({
    where: { workspaceId, userId: user.id, role: "admin" },
  });

  if (!member) return;

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name: name.trim() },
  });

  revalidatePath(`/dashboard/workspace/${workspaceId}`);
}

export async function deleteWorkspace(workspaceId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("No autenticado");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("Usuario no encontrado");

  const member = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: user.id, workspaceId } },
  });

  if (!member || member.role !== "admin") throw new Error("No autorizado");

  await prisma.workspace.delete({ where: { id: workspaceId } });

  redirect("/dashboard");
}