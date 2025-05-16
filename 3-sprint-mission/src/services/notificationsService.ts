import * as notificationRepository from "../repositories/notificationsRepository";
import { Notification } from "@prisma/client";

export async function getUserNotifications(
  userId: number
): Promise<Notification[]> {
  const notifications = await notificationRepository.getNotifications(userId);
  return notifications;
}

export async function patchRead(id: number): Promise<Notification> {
  const notification = await notificationRepository.patchReadStatus(id);
  return notification;
}
