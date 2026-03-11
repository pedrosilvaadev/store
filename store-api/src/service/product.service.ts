import pool from "../lib/db";
import redis from "../lib/redis";

interface ProductsProps {
  category?: string;
  key?: "products:all";
}

const getProducts = async ({ category, key }: ProductsProps) => {
  if (key) {
    const productsCached = await redis.get(key);

    if (productsCached) {
      return JSON.parse(productsCached);
    }
  }

  let query = "SELECT * FROM products";
  const params: any[] = [];
  if (category) {
    query += " WHERE category = $1";
    params.push(category);
  }
  query += " ORDER BY name ASC";

  const { rows } = await pool.query(query, params);

  if (key) {
    await redis.set(key, JSON.stringify(rows), "EX", 60); // Cache for 60 seconds
  }

  return rows;
};

export const productsService = {
  getProducts,
};
