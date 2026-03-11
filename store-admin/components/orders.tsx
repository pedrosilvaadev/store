"use client";

import { useOrder } from "@/hooks/useOrder";
import { OrderHistory } from "./order-history";

export function Orders() {
  const { orders, isLoading } = useOrder();

  return (
    <div>
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : (
        <OrderHistory orders={orders} />
      )}
    </div>
  );
}
