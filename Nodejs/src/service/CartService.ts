import { GetUserAuthInfoRequest } from "../entity/Request";
import { CartModel } from "../entity/CartModel";
import query from "./db";

async function AllCart({ userID }) {
  const result = await query(`SELECT * from cart_product WHERE user_id=?`, [
    userID,
  ]);

  if (result) {
    return { message: "success", result };
  }

  throw new Error("Error");
}

async function CreateCart({ userID, quantity, product_ID }) {
  const fetchUserCarts = await query(
    `
  SELECT * from cart_product WHERE user_id=? AND product_ID=?`,
    [userID, product_ID]
  );

  if (!!fetchUserCarts.length) {
    return await UpdateCart({ userID, quantity, product_ID });
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

async function UpdateCart({ userID, quantity, product_ID }) {
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

async function DeleteCart({ id, userID }) {
  const result = await query(
    `DELETE FROM cart_product WHERE ID=? AND user_id=?`,
    [id, userID]
  );

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
