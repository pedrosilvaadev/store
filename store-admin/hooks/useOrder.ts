"use client";

import { createOrder, getOrders } from "@/api/orders";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderingIds, setOrderingIds] = useState<Set<string>>(new Set());

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const orders = await getOrders();
      setOrders(orders);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderProduct = async (
    product: Product,
    onOrderSuccess?: (updatedProduct: Product) => void,
  ) => {
    if (product.stock <= 0) return;

    setOrderingIds((prev) => new Set(prev).add(product.id.toString()));

    try {
      await createOrder({ productId: product.id, quantity: 1 });
      const updatedProduct = { ...product, stock: product.stock - 1 };
      toast.success(`Ordered 1x ${product.name}`);

      if (onOrderSuccess) onOrderSuccess(updatedProduct);
    } catch {
      toast.error("Failed to place order");
    } finally {
      setOrderingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(product.id.toString());
        return copy;
      });
    }
  };

  const isOrdering = (productId: string) => orderingIds.has(productId);

  return { orderProduct, isOrdering, orders, fetchOrders, isLoading };
};
