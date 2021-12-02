import { Request } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import { CartModel } from "../entity/CartModel";
import { ProductModel } from "../entity/ProductModel";
const db = require("./db");

async function CreateCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;
  const { status }: CartModel = req.body;

  const result = await db.query(
    `INSERT INTO cart
      (use_ID, status) 
      VALUES 
      (?, ?, ?, ?, ?, ?)`,
    [userID, status]
  );

  let message = "Error in creating cart";

  if (result.affectedRows) {
    message = "success";
  }

  return { message };
}

async function DeleteCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;

  const result = await db.query(`DELETE FROM cart WHERE ID=?`, [userID]);
  let message = "Error in deleting your cart";

  if (result.affectedRows) {
    return {
      message: "success",
    };
  }
  return { message };
}

const UserCrud = {
  CreateCart,
  DeleteCart,
};
export default UserCrud;