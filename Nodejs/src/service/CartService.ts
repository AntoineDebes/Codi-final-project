import { GetUserAuthInfoRequest } from "../entity/Request";
import { CartModel } from "../entity/CartModel";
import query from "./db";

async function AllCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;

  const result = await query(`SELECT * FROM cart_product WHERE user_id=?`, [
    userID,
  ]);

  if (!!result.length) {
    return { message: "success", result };
  }

  throw new Error("Error");
}

async function CreateCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;
  const { quantity, product_ID }: CartModel = req.body;

  const fetchUserCarts = await query(
    `
  SELECT * from cart_product WHERE user_id=? AND product_ID=?`,
    [userID, product_ID]
  );

  if (!!fetchUserCarts.length) {
    console.log("fetchUserCarts", fetchUserCarts);
    return await UpdateCart(req);
  }

  const result = await query(
    `INSERT INTO cart_product
      (user_id, product_ID, Quantity) 
      VALUES 
      (?, ?, ?)`,
    [userID, product_ID, quantity]
  );

  if (result.affectedRows) {
    return { message: "Product has been added" };
  }

  throw new Error("Something went wrong");
}

async function UpdateCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;
  const { quantity, product_ID }: CartModel = req.body;

  const result = await query(
    `UPDATE cart_product 
      SET Quantity=? 
      WHERE user_id=? AND product_ID=?`,
    [quantity, userID, product_ID]
  );

  if (result.affectedRows) {
    return { message: "success" };
  }

  throw new Error("Something went wrong");
}

async function DeleteCart(req: GetUserAuthInfoRequest) {
  const { userID } = req;

  const result = await query(`DELETE FROM cart WHERE ID=?`, [userID]);

  if (result.affectedRows) {
    return {
      message: "success",
    };
  }
  throw new Error("Something went wrong");
}

const UserCrud = {
  AllCart,
  CreateCart,
  UpdateCart,
  DeleteCart,
};
export default UserCrud;
