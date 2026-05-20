"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComment(taskId: string, workspaceId: string, formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return;

  const content = formData.get("content") as string;
  if (!content?.trim()) return;

  await prisma.comment.create({
    data: {
      content,
      taskId,
      userId: user.id,
    },
  });

  revalidatePath(`/dashboard/workspace/${workspaceId}/task/${taskId}`);
}

export async function deleteComment(commentId: string, taskId: string, workspaceId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return;

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment || comment.userId !== user.id) return;

  await prisma.comment.delete({ where: { id: commentId } });

  revalidatePath(`/dashboard/workspace/${workspaceId}/task/${taskId}`);
}