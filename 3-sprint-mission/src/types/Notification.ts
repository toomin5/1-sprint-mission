export interface Notificatioon {
  id: number;
  userId: number | null;
  payload: JSON;
  read: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
