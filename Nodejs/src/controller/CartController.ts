import { CartModel } from "./../entity/CartModel";
import { NextFunction, Request, Response } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import CartCrud from "../service/CartService";
import ProductCrud from "../service/ProductService";

export class CartController {
  async all(request: Request, response: Response, next: NextFunction) {
    const { userID }: GetUserAuthInfoRequest = request;

    try {
      const data = await CartCrud.AllCart({ userID });
      const newData = await Promise.all(
        await data.result.map(async (cartItem: any) => {
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
    const { userID }: GetUserAuthInfoRequest = request;
    const { quantity, product_ID }: CartModel = request.body;
    try {
      return response
        .status(200)
        .json(await CartCrud.CreateCart({ quantity, product_ID, userID }));
    } catch (error) {
      return {
        message: error.message,
        status: 500,
      };
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    const { userID }: GetUserAuthInfoRequest = request;
    const { quantity, product_ID }: CartModel = request.body;
    try {
      return response
        .status(200)
        .json(await CartCrud.UpdateCart({ quantity, product_ID, userID }));
    } catch (error) {
      return {
        message: error.message,
        status: 500,
      };
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    const { id }: any = request.body;
    const { userID }: GetUserAuthInfoRequest = request;
    try {
      return response
        .status(200)
        .json(await CartCrud.DeleteCart({ id, userID }));
    } catch (error) {
      return {
        message: { error },
        status: 500,
      };
    }
  }
}
