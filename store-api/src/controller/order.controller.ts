import { Request, Response } from "express";
import { ordersService } from "../service/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const order = await ordersService.createOrder({
      product_id: productId,
      quantity,
    });
    return res.status(201).json(order);
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ error: error?.message || "Internal Server Error" });
    console.log(error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await ordersService.getOrders();
    return res.status(200).json(orders);
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ error: error?.message || "Internal Server Error" });
    console.log(error);
  }
};
