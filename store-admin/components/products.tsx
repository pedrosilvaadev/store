"use client";
import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "./products-grid";
import { Product } from "@/types/product";
import { LowStockAlert } from "./low-stock-alert";
import { CategoryFilter } from "./category-filter";

export function Products({ initialProducts }: { initialProducts: Product[] }) {
  const {
    isLoading,
    products,
    categories,
    changeCategory,
    category,
    updateProduct,
  } =
    useProducts(initialProducts);

  return (
    <div>
      <LowStockAlert products={products} />
      <div className="bg-white p-4 rounded-lg shadow-sm my-6">
        <CategoryFilter
          categories={categories}
          onCategoryChange={changeCategory}
          selectedCategory={category}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ProductGrid
          products={products}
          isLoading={isLoading}
          onOrderSuccess={updateProduct}
        />
      </div>
    </div>
  );
}
