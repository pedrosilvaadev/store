import pool from "../lib/db";

interface OrderProps {
  product_id: number;
  quantity: number;
}

const createOrder = async ({ product_id, quantity }: OrderProps) => {
  const client = await pool.connect();
  const productIdNumber = Number(product_id);
  const quantityNumber = Number(quantity);

  await client.query("BEGIN");

  try {
    const { rows } = await client.query(
      "SELECT stock, price_cents FROM products WHERE id = $1 FOR UPDATE",
      [productIdNumber],
    );
    const product = rows[0];

    if (!product) {
      return { error: "Product not found", status: 404 };
    }

    if (product.stock < quantityNumber) {
      return { error: "Not enough stock", status: 400 };
    }

    const newStock = product.stock - quantityNumber;
    await client.query("UPDATE products SET stock = $1 WHERE id = $2", [
      newStock,
      productIdNumber,
    ]);

    const total = product.price_cents * quantityNumber;
    const orderResult = await client.query(
      "INSERT INTO orders (product_id, quantity, total_cents) VALUES ($1, $2, $3) RETURNING *",
      [productIdNumber, quantityNumber, total],
    );

    await client.query("COMMIT");
    return orderResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getOrders = async () => {
  const { rows } = await pool.query(`
    SELECT 
      o.id AS id,
      o.product_id as "productId",
      o.quantity,
      o.created_at as "createdAt",
      o.total_cents as "totalCents",
      p.name AS "productName",
      p.category AS "productCategory"
    FROM orders o
    JOIN products p ON o.product_id = p.id
    ORDER BY o.created_at DESC
  `);

  return rows;
};

export const ordersService = {
  createOrder,
  getOrders,
};
