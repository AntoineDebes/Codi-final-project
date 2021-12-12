import { NextFunction, Request, Response } from "express";
import ProductCrud from "../service/ProductService";

export class ProductController {
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      return response
        .status(200)
        .json(await ProductCrud.GetAllProduct(request));
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async add(request: Request, response: Response, next: NextFunction) {
    try {
      return response
        .status(200)
        .json(await ProductCrud.CreateProduct(request));
    } catch (error) {
      console.log(error);

      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      return response
        .status(200)
        .json(await ProductCrud.DeleteProduct(request));
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
}
