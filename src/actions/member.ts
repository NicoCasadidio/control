"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createActivity } from "@/lib/activity";
import { ActivityType } from "@/generated/prisma/client";

export async function removeMember(userId: string, workspaceId: string) {

    const { userId: clerkId } = await auth();
    if (!clerkId) redirect("/");
    
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) redirect("/");

    const currentMember = await prisma.workspaceMember.findUnique({
        where: { userId_workspaceId: { userId: user.id, workspaceId } },
    });
    if (!currentMember) redirect("/");

    const targetMember = await prisma.workspaceMember.findUnique({
        where: { userId_workspaceId: { userId, workspaceId } },
    });
    if (!targetMember) redirect("/");

    if (user.id === userId) {
        if (currentMember.role === "admin") redirect("/");
    } else {
        if (currentMember.role !== "admin") redirect("/");
    }

    await prisma.workspaceMember.delete({
        where: { userId_workspaceId: { userId, workspaceId } },
    });

    await createActivity({
    workspaceId,
    actorId: user.id,
    type: ActivityType.MEMBER_REMOVED,
    targetUserId: userId,
    });

    if(user.id === userId) {
        redirect(`/dashboard`);        
    } else {
        redirect(`/dashboard/workspace/${workspaceId}`);
    }
}