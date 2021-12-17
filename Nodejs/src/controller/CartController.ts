import { NextFunction, Request, Response } from "express";
import CartCrud from "../service/CartService";

export class CartController {
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await CartCrud.AllCart(request));
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
      return response.status(200).json(await CartCrud.DeleteCart(request));
    } catch (error) {
      return {
        message: { error },
        status: 500,
      };
    }
  }
}
