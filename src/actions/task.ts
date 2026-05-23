"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import { createActivity } from "@/lib/activity";
import { ActivityType } from "@/generated/prisma/client";

export async function createTask(workspaceId: string, formData: FormData) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { error: "No autenticado" };
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const assigneeId = formData.get("assigneeId") as string | null;
  const dueDate = formData.get("dueDate") as string | null;

  if (!title || title.trim() === "") {
    return { error: "El título es requerido" };
  }

  try {
    await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        status: "pending",
        workspaceId,
        creatorId: user.id,
        assigneeId: assigneeId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    await createActivity({
      workspaceId,
      actorId: user.id,
      type: ActivityType.TASK_CREATED,
      taskTitle: title.trim(),
    });

    revalidatePath(`/dashboard/workspace/${workspaceId}`);
    return { success: true };
  } catch (error) {
    return { error: "Error al crear la tarea" };
  }
}

export async function updateTaskStatus(taskId: string, taskTitle: string, workspaceId: string, newStatus: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) redirect("/sign-in");

  await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  await createActivity({
    workspaceId,
    actorId: user.id,
    type: ActivityType.TASK_STATUS_CHANGED,
    taskId,
    taskTitle,
  });
}

export async function deleteTask(taskId: string, workspaceId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("No autenticado");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("Usuario no encontrado");

  const member = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: user.id, workspaceId } },
  });

  if (!member || member.role !== "admin") throw new Error("No autorizado");

  await prisma.task.delete({ where: { id: taskId } });

  redirect(`/dashboard/workspace/${workspaceId}`);
}

export async function updateTask(taskId: string, workspaceId: string, formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("No autenticado");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("Usuario no encontrado");

  const member = await prisma.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: user.id, workspaceId } },
  });

  if (!member || member.role !== "admin") throw new Error("No autorizado");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const assigneeId = formData.get("assigneeId") as string | null;
  const dueDate = formData.get("dueDate") as string | null;

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description: description || null,
      assigneeId: assigneeId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  revalidatePath(`/dashboard/workspace/${workspaceId}/task/${taskId}`);
}