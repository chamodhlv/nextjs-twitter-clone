"use server";

import prisma from "@/lib/prisma";
import { getDbUserId, getUserByClerkId } from "./user.action";
import { auth } from "@clerk/nextjs/server";

export async function getNotifications() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return [];

    const userId = await getDbUserId();

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return { success: false };
  }
}

export async function getUnreadNotificationCount() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return 0;

    const user = await getUserByClerkId(clerkId);
    if (!user) return 0;

    return await prisma.notification.count({
      where: {
        userId: user.id,
        read: false,
      },
    });
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    return 0;
  }
}

