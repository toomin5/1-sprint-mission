import { prismaClient } from "../lib/prismaClient";
import { Notification, Prisma } from "@prisma/client";

type createNotificationData = Omit<
  Notification,
  "id" | "read" | "createdAt" | "updatedAt"
>;

export async function createNotification(
  data: createNotificationData
): Promise<Notification> {
  return await prismaClient.notification.create({
    data: {
      ...data,
      read: false,
      payload: data.payload as Prisma.InputJsonValue,
    },
  });
}
