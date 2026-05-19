"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTask(workspaceId: string, formData: FormData) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;

  if (!title || title.trim() === "") {
    return;
  }

  await prisma.task.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      status: "pending",
      workspaceId,
      creatorId: user.id,
    },
  });

  redirect(`/dashboard/workspace/${workspaceId}`);
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });
}