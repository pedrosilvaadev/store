"use client";
import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { Skeleton } from "./ui/skeleton";
import { useOrder } from "@/hooks/useOrder";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onOrderSuccess: (updatedProduct: Product) => void;
}

export function ProductGrid({
  products,
  isLoading,
  onOrderSuccess,
}: ProductGridProps) {
  const { orderProduct, isOrdering } = useOrder();

  const handleOrder = async (product: Product) => {
    await orderProduct(product, onOrderSuccess);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOrder={handleOrder}
          isOrdering={isOrdering(product.id.toString())}
        />
      ))}
    </div>
  );
}
