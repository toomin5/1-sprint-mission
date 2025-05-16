import notificationResponseDTO from "../dto/notificationsDTO";
import * as notificationsService from "../services/notificationsService";
import { Request, Response, NextFunction } from "express";

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.user.id;
  const notifications = await notificationsService.getUserNotifications(userId);
  const result = notifications.map(notificationResponseDTO);
  res.status(200).send(result);
}

export async function patchReadStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const id = Number(req.params.notificationId);
  const notification = await notificationsService.patchRead(id);
  res.status(204).json(notificationResponseDTO(notification));
}
