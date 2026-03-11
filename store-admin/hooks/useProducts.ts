"use client";
import { getProducts } from "@/api/products";
import { Product } from "@/types/product";
import { useState, useEffect, useCallback } from "react";

export const useProducts = (initialProducts: Product[] = []) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(products.map((p) => p.category)),
  ).sort();

  const fetchProducts = useCallback(async (categoryFilter?: string | null) => {
    setIsLoading(true);
    try {
      const query = categoryFilter ? `?category=${categoryFilter}` : "";
      const res = await getProducts(query);
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts]);

  const changeCategory = (cat: string | null) => {
    setCategory(cat);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return {
    products,
    isLoading,
    category,
    changeCategory,
    updateProduct,
    categories,
  };
};
