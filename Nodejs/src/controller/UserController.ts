import { UserModelCreate, UserModelLogin } from "./../entity/User";
import { NextFunction, Request, Response } from "express";
import UserCrud from "../service/UserService";
import UserRegisterErrorHandling from "../error/UserErrorHandling";
import { GetUserAuthInfoRequest } from "../entity/Request";

export class UserController {
  async register(request: Request, response: Response, next: NextFunction) {
    const {
      firstName,
      lastName,
      userName,
      phone,
      email,
      password,
      address,
    }: UserModelCreate = request.body;
    try {
      return response.status(200).json(
        await UserCrud.CreateUser({
          firstName,
          lastName,
          userName,
          phone,
          email,
          password,
          address,
        })
      );
    } catch (error) {
      return response.status(403).json(UserRegisterErrorHandling({ error }));
    }
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password }: UserModelLogin = request.body;
    try {
      return response
        .status(200)
        .json(await UserCrud.LogUserIn({ email, password }));
    } catch (error) {
      return response.status(401).json({
        message: error.message,
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
    request: GetUserAuthInfoRequest,
    response: Response,
    next: NextFunction
  ) {
    const { userID } = request;
    try {
      return response
        .status(200)
        .json(await UserCrud.EmailVerification({ userID }));
    } catch (error) {
      return {
        message: "invalid token",
        status: 401,
      };
    }
  }
}
