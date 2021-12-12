import { Request } from "express";
import { GetProductInfoRequest } from "../entity/Request";
import { ProductModel } from "../entity/ProductModel";
import query from "./db";

async function GetAllProduct(req: Request) {
  const result = await query(`SELECT * FROM product`);
  let message = "Error in getting the products";

  let nestedObject: any = {
    hero: [],
    sales: [],
    normal: [],
  };

  if (result) {
    nestedObject.hero = result.filter((_product: any) => {
      return _product.productPlacement === "hero";
    });
    nestedObject.sales = result.filter((_product: any) => {
      return _product.productPlacement === "sales";
    });
    nestedObject.normal = result.filter((_product: any) => {
      return _product.productPlacement === "normal";
    });

    return nestedObject;
  }
  return { message };
}

async function CreateProduct(req: Request) {
  const {
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
  }: ProductModel = req.body;
  // console.log(name, serialNumber, price, quantity, packaging, transport);

  const result = await query(
    `INSERT INTO product
      (name, serial_number, price, quantity, packaging, transport, Base64, ImageFormat, productPlacement, content) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ]
  );

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "success";
  }

  return { message };
}

async function DeleteProduct(req: GetProductInfoRequest) {
  const { productID } = req;

  const result = await query(`DELETE FROM product WHERE ID=?`, [productID]);
  let message = "Error in deleting your product";

  if (result.affectedRows) {
    return {
      message: "success",
    };
  }
  return { message };
}

const UserCrud = {
  GetAllProduct,
  CreateProduct,
  DeleteProduct,
};
export default UserCrud;
