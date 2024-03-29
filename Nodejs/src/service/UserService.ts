import { jwtCreate } from "./../middleware/jwt";
import { Request } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import { UserModelCreate, UserModelLogin } from "../entity/User";
import query from "./db";
import bcrypt from "bcrypt";
import { nodemailerEmailVerification } from "./Nodemailer";

async function CreateUser({
  firstName,
  lastName,
  userName,
  phone,
  email,
  password,
  address,
}) {
  email.toLowerCase();

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALTROUND)
  );

  const result = await query(
    `INSERT INTO users
      (first_name, last_name, user_name, phone, email, password, address, verified, isAdmin) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, userName, phone, email, hashedPassword, address, 0, 0]
  );
  const targetedUser: any = await query("SELECT ID FROM users WHERE email=?", [
    email,
  ]);
  const ID = targetedUser[0].ID;
  const token = await jwtCreate(ID);

  const tokenInsert = await query(
    `UPDATE users 
    SET token=? 
    WHERE ID=?`,
    [token, ID]
  );

  if (result.affectedRows && tokenInsert.affectedRows) {
    await nodemailerEmailVerification({ email, token, userName });
    return { message: "success" };
  }

  throw new Error("Error in creating user");
}

async function LogUserIn({ email, password }) {
  email.toLowerCase();

  const users: any[] = await query(
    `
  SELECT * FROM users WHERE email = ? `,
    [email]
  );
  const user = users[0];

  if (!user) {
    throw new Error("Email doesn't exist");
  } else if (user.verified !== 1) {
    throw new Error("Please check your email for verfication");
  } else if (!!user) {
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      const token = await jwtCreate(user.ID);
      return {
        token,
        isAdmin: user.isAdmin === 1 ? true : false,
        userName: user.user_name,
        message: "success",
      };
    }
  }
  throw new Error("Invalid username or password");
}

async function EmailVerification({ userID }) {
  const result = await query(
    `UPDATE users 
    SET verified=? 
    WHERE ID=?`,
    [1, userID]
  );

  if (result.affectedRows) {
    return { message: "success" };
  }

  throw new Error("Error in verifying user");
}

async function deleteUser(req: GetUserAuthInfoRequest) {
  const { userID } = req;

  const result = await query(`DELETE FROM users WHERE ID=?`, [userID]);

  if (result.affectedRows) {
    return {
      message: "success",
    };
  }
  throw new Error("Error in deleting your profile");
}

const UserCrud = {
  CreateUser,
  LogUserIn,
  deleteUser,
  EmailVerification,
};
export default UserCrud;
