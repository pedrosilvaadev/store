import { Product } from "@/types/product";
import { apiFetch } from "./api";

export const getProducts = async (query?: string): Promise<Product[]> => {
  const response = await apiFetch<Product[]>(`/products${query || ""}`);
  return response;
};
