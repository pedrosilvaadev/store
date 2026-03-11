import { Request, Response } from "express";
import { productsService } from "../service/product.service";
import console from "console";
import { ordersService } from "../service/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity } = req.body;
    const order = await ordersService.createOrder({ product_id, quantity });
    return res.status(201).json(order);
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ error: error?.message || "Internal Server Error" });
    console.log(error);
  }
};
