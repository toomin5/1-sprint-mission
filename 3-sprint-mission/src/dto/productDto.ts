export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  likeCount?: number;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  tags: string[];
}
