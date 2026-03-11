export interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalCents: number;
  createdAt: string;
  productName: string;
  productCategory: string;
}
