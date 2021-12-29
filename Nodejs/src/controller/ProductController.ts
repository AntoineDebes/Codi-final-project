import { ProductRequestModel } from "./../entity/ProductModel";
import { NextFunction, Request, Response } from "express";
import { GetProductInfoRequest } from "../entity/Request";
import ProductCrud from "../service/ProductService";

export class ProductController {
  async getAll(request: Request, response: Response) {
    try {
      return response.status(200).json(await ProductCrud.GetAllProduct());
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async add(request: ProductRequestModel, response: Response) {
    const {
      userID,
      body: {
        name,
        serialNumber,
        price,
        quantity,
        packaging,
        transport,
        productPlacement,
        content,
      },
      file: { filename },
    }: ProductRequestModel = request;
    try {
      return response.status(200).json(
        await ProductCrud.CreateProduct({
          name,
          serialNumber,
          price,
          quantity,
          packaging,
          transport,
          productPlacement,
          content,
          filename,
        })
      );
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async delete(request: Request, response: Response) {
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
