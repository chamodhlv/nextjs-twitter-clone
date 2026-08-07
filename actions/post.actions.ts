"use server";
import prisma from "@/lib/prisma";
import { getDbUserId } from "@/actions/user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, imageUrl?: string) {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        authorId: userId,
      },
    });

    revalidatePath("/");

    return { success: true, post };
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
