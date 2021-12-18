import { NextFunction, Request, Response } from "express";
import CartCrud from "../service/CartService";
import ProductCrud from "../service/ProductService";

export class CartController {
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      // console.log("get all carts", await CartCrud.AllCart(request));
      const data = await CartCrud.AllCart(request);
      console.log("Data", data);
      const newData = await Promise.all(
        await data.result.map(async function (cartItem) {
          const product = await ProductCrud.GetOneProduct(cartItem.product_ID);
          return {
            ...cartItem,
            product,
          };
        })
      );
      return response.status(200).json({
        message: "success",
        result: newData,
      });
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async add(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await CartCrud.CreateCart(request));
    } catch (error) {
      console.log(error);

      return {
        message: error.message,
        status: 500,
      };
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await CartCrud.UpdateCart(request));
    } catch (error) {
      console.log(error);

      return {
        message: error.message,
        status: 500,
      };
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      console.log("Delete product ", request.body["id"]);
      return response.status(200).json(await CartCrud.DeleteCart(request));
    } catch (error) {
      return {
        message: { error },
        status: 500,
      };
    }
  }
}
