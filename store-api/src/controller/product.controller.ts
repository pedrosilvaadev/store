import { Request, Response } from "express";
import { productsService } from "../service/product.service";
import console from "console";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query as { category?: string };

    if (category) {
      const products = await productsService.getProducts({ category });
      return res.json(products);
    }

    const products = await productsService.getProducts({ key: "products:all" });
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};
