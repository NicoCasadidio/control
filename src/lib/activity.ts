import { ActivityType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

interface CreateActivityParams {
  workspaceId: string;
  actorId: string;
  type: ActivityType;
  taskId?: string;
  taskTitle?: string;
  targetUserId?: string;
  targetUserName?: string;
}

export async function createActivity(params: CreateActivityParams) {
  await prisma.activity.create({
    data: params,
  });
}