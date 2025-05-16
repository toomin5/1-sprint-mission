import { Notification } from "@prisma/client";

const notificationResponseDTO = (notification: Notification) => {
  return {
    id: notification.id,
    type: notification.type,
    payload: notification.payload,
    read: notification.read,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
  };
};

export default notificationResponseDTO;
