export class NotificationResponseDto {
  id!: number;
  message!: string;
  isRead!: boolean;
  createdAt!: Date;
  articleId?: number;
  productId?: number;
}

// !는 할당이 필수적으로 된다는것을 명시
