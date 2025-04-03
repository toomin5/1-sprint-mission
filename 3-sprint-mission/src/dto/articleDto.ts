export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticle {
  title: string;
  content: string;
}

export interface UpdateArticle extends Partial<CreateArticle> {}
