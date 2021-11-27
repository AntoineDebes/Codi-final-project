import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const jwtVerify = async (
  request: Request,
  response: Response,
  next: Function
) => {
  await jwt
    .verify(
      request.headers["auth-token"],
      process.env.ACCESS_TOKEN_SECRET,
      async function (err: any, decoded: any) {
        if (err) {
          return { message: "invalid token", status: 401 };
        } else {
          next();
        }
      }
    )
    .catch((err: Error) => {
      return {
        message: `JWT function error \n ${err}`,
      };
    });
};

export const jwtCreate = (username) => {
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1y",
  });
  return accessToken;
};
