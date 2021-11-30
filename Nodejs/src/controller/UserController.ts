import { NextFunction, Request, Response } from "express";
import UserCrud from "../service/UserService";

export class UserController {
  async register(request: Request, response: Response, next: NextFunction) {
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
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.deleteUser(request));
    } catch (error) {
      return {
        message: { error },
        status: 500,
      };
    }
  }
  async EmailVerification(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      return response
        .status(200)
        .json(await UserCrud.EmailVerification(request));
    } catch (error) {
      return {
        message: "invalid token",
        status: 401,
      };
    }
  }
}
