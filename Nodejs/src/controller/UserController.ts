import { NextFunction, Request, Response } from "express";
import UserCrud from "../service/UserService";
// var jwt = require("jsonwebtoken");

export class UserController {
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.CreateUser(request));
    } catch (error) {
      return {
        message: error.message,
        status: 500,
      };
    }
  }
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.LogUserIn(request));
    } catch (error) {
      return {
        message: "invalid userName or Password",
        status: 500,
      };
    }
  }
}
