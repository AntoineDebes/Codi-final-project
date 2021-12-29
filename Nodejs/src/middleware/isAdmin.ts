import { Response } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import dotenv from "dotenv";
import { isAdminCheckMiddleware } from "../service/IsAdminCheck";

dotenv.config();

export const isAdmin = async (
  request: GetUserAuthInfoRequest,
  response: Response,
  next: Function
) => {
  const userID = request.userID;
  const isAdmin = await isAdminCheckMiddleware(userID);
  if (isAdmin !== 1) {
    return response.status(401).json({ message: "User not Authorized" });
  } else {
    next();
  }
};
