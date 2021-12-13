import { NextFunction, Request, Response } from "express";
import UserCrud from "../service/UserService";
import UserRegisterErrorHandling from "../error/UserErrorHandling";

export class UserController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.CreateUser(request));
    } catch (error) {
      console.log(error);

      return response.status(403).json(UserRegisterErrorHandling({ error }));
    }
  }
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.LogUserIn(request));
    } catch (error) {
      console.log(error);

      return response.status(401).json({
        message: "invalid Username or Password",
      });
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(200).json(await UserCrud.deleteUser(request));
    } catch (error) {
      return response.status(403).json({
        message: error.message,
      });
    }
  }
  async EmailVerification(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log("test");

    try {
      return response
        .status(200)
        .json(await UserCrud.EmailVerification(request));
    } catch (error) {
      console.log(error);

      return {
        message: "invalid token",
        status: 401,
      };
    }
  }
}
