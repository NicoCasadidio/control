"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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