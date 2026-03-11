import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => Promise<void>;
  isOrdering: boolean;
}

export function ProductCard({
  product,
  onOrder,
  isOrdering,
}: ProductCardProps) {
  const handleOrder = async () => {
    await onOrder(product);
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">
            {product.name}
          </h3>
          <Badge variant="secondary" className="shrink-0 capitalize">
            {product.category}
          </Badge>
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatPrice(product.price_cents / 100)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Stock:</span>
            {isOutOfStock ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : isLowStock ? (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600"
              >
                Low Stock ({product.stock})
              </Badge>
            ) : (
              <span className="font-semibold">{product.stock}</span>
            )}
          </div>
        </div>

        <Button
          onClick={handleOrder}
          disabled={isOrdering || isOutOfStock}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isOrdering
            ? "Ordering..."
            : isOutOfStock
              ? "Out of Stock"
              : "Order 1"}
        </Button>
      </div>
    </div>
  );
}
