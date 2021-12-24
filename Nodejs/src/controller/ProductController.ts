import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../entity/ProductModel";
import { GetProductInfoRequest } from "../entity/Request";
import ProductCrud from "../service/ProductService";

export class ProductController {
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await ProductCrud.GetAllProduct());
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async add(request: ProductModel, response: Response, next: NextFunction) {
    const {
      userID,
      body: {
        name,
        serialNumber,
        price,
        quantity,
        packaging,
        transport,
        base64,
        imageFormat,
        productPlacement,
        content,
      },
    }: ProductModel = request;
    try {
      return response.status(200).json(
        await ProductCrud.CreateProduct({
          userID,
          body: {
            name,
            serialNumber,
            price,
            quantity,
            packaging,
            transport,
            base64,
            imageFormat,
            productPlacement,
            content,
          },
        })
      );
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    const {
      body: { productID },
      userID,
    }: GetProductInfoRequest = request;
    try {
      return response.status(200).json(
        await ProductCrud.DeleteProduct({
          productID,
          userID,
        })
      );
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
}
