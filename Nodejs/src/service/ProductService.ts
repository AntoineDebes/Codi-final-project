import { Request } from "express";
import { GetProductInfoRequest } from "../entity/Request";
import { ProductModel } from "../entity/ProductModel";
const db = require("./db");

async function GetAllProduct(req: Request) {
  const result = await db.query(`SELECT * FROM product`);
  let message = "Error in getting the products";
  if (result) message = result;
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
  }: ProductModel = req.body;

  const result = await db.query(
    `INSERT INTO product
      (name, serial_number, price, quantity, packaging, transport) 
      VALUES 
      (?, ?, ?, ?, ?, ?)`,
    [name, serialNumber, price, quantity, packaging, transport]
  );

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "success";
  }

  return { message };
}

async function DeleteProduct(req: GetProductInfoRequest) {
  const { productID } = req;

  const result = await db.query(`DELETE FROM product WHERE ID=?`, [productID]);
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
