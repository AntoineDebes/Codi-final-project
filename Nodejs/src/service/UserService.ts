import { jwtCreate } from "./../middleware/jwt";
import { Request } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import { UserModelCreate, UserModelLogin } from "../entity/User";
const db = require("./db");
const bcrypt = require("bcrypt");

async function CreateUser(req: Request) {
  const {
    firstName,
    lastName,
    userName,
    phone,
    email,
    password,
    address,
    verified,
  }: UserModelCreate = req.body;

  const result = await db.query(
    `INSERT INTO users
      (first_name, last_name, user_name, phone, email, password, address, verified) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, userName, phone, email, password, address, verified]
  );
  const targetedUser: any = await db.query(
    "SELECT ID FROM users WHERE email=?",
    [email]
  );
  const ID = targetedUser[0].ID;
  const token = await jwtCreate(ID);

  const tokenInsert = await db.query(
    `UPDATE users 
    SET token=? 
    WHERE ID=?`,
    [token, ID]
  );

  let message = "Error in creating user";

  if (result.affectedRows && tokenInsert.affectedRows) {
    message = "success";
  }

  return { message };
}

async function LogUserIn(req: Request) {
  const { email, password }: UserModelLogin = req.body;

  const result = await db.query(
    `
  SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password]
  );
  let message = "Error in login user";

  if (result) {
    console.log(result);

    const token = await jwtCreate(result[0].ID);
    return {
      token: token,
      message: "success",
    };
  }
  return { message };
}

async function EmailVerification(req: GetUserAuthInfoRequest) {
  const { userID } = req;
  const result = await db.query(
    `UPDATE users 
    SET verified=? 
    WHERE ID=?`,
    [1, userID]
  );

  let message = "Error in verifying user";

  if (result.affectedRows) {
    message = "success";
  }

  return { message };
}

async function deleteUser(req: GetUserAuthInfoRequest) {
  const { userID } = req;

  const result = await db.query(`DELETE FROM users WHERE ID=?`, [userID]);
  let message = "Error in deleting your profile";

  if (result.affectedRows) {
    return {
      message: "success",
    };
  }
  return { message };
}

//   public async CreateUser(req: Request) {
//       const {email, userName, Phone} = req.body;
//     try {
//       if (
//         !!(await this.connection(this.user).findOne({ Email: req.body.Email }))
//       )
//         return { message: "Email already exists!!", status: 400 };
//       if (
//         !!(await this.connection(this.user).findOne({
//           UserName: req.body.UserName,
//         }))
//       )
//         return { message: "UserName already exists!!", status: 400 };
//       if (
//         !!(await this.connection(this.user).findOne({
//           PhoneNumber: req.body.PhoneNumber,
//         }))
//       )
//         return { message: "Phone Number already exists!!", status: 400 };
//       const hash = await bcrypt.hash(
//         req.body.Password,
//         process.env.SALTROUND || 10
//       );
//       await this.connection(this.user).save({
//         ...req.body,
//         Password: hash,
//       });

//       let ID: any = await this.connection(this.user).query(
//         "SELECT ID,Email FROM user WHERE Email=?",
//         [req.body.Email]
//       );
//       let data: any[] = [];
//       data = ID;
//       const token = await jwt.sign({ ID: data[0].ID }, "theSecret", {
//         expiresIn: "12h",
//       });

//     return { message: "User Created", status: 200 };
//     } catch (error) {
//       return { message: error.message, status: 400 };
//     }
//   }

const UserCrud = {
  CreateUser,
  LogUserIn,
  deleteUser,
  EmailVerification,
};
export default UserCrud;
