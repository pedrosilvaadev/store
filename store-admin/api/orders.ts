import { apiFetch } from "./api";
import { Order } from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const orders = await apiFetch<Order[]>("/orders");
  return orders;
};

export const createOrder = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}): Promise<void> => {
  await apiFetch(`/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
};
