import { Request, Response } from "express";
import { GetUserAuthInfoRequest } from "../entity/Request";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtVerify = async (
  request: GetUserAuthInfoRequest,
  response: Response,
  next: Function
) => {
  const userJwt = request.headers["authorization"];

  if (!!userJwt.length) {
    jwt.verify(
      request.headers["authorization"],
      process.env.ACCESS_TOKEN_SECRET,
      async function (err: any, decoded: any) {
        if (err) {
          throw new Error("invalid token");
        } else {
          request.userID = decoded.ID;
          next();
        }
      }
    );
  } else {
    return response.status(401).json({ message: "User not Authorized" });
  }
};

export const jwtCreate = (ID: any) => {
  const accessToken = jwt.sign({ ID }, process.env.ACCESS_TOKEN_SECRET, {
    noTimestamp: true,
    expiresIn: "1y",
  });
  return accessToken;
};
