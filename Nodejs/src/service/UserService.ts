import { Request } from "express";
import { UserModel as User } from "../entity/User";
import { jwtCreate } from "../middleware/jwt";
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
  } = req.body;

  const token = jwtCreate(userName);

  const result = await db.query(
    `INSERT INTO users
      (first_name, last_name, user_name, phone, email, password, address, verified, token) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      userName,
      phone,
      email,
      password,
      address,
      verified,
      token,
    ]
  );

  let message = "Error in creating programming language";

  if (result.affectedRows) {
    message = "Programming language created successfully";
  }

  return { message };
}

async function LogUserIn(req: Request) {
  const { email, password } = req.body;

  const result = await db.query(
    `
  SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password]
  );
  let message = "Error in creating programming language";

  if (result) {
    console.log(result);

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
};
export default UserCrud;
