import { AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Product } from "@/types/product";

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  if (products.length === 0) return null;
  const filteredProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  if (filteredProducts.length === 0) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900 mb-2">
            Low Stock Alert ({filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"})
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredProducts.map((product) => (
              <Badge key={product.id} variant="outline" className="bg-white">
                {product.name}
                <span className="ml-1 font-bold text-amber-700">
                  ({product.stock} left)
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
