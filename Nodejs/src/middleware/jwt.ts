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
  console.log("jwt passed");

  await jwt
    .verify(
      request.headers["auth-token"],
      process.env.ACCESS_TOKEN_SECRET,
      async function (err: any, decoded: any) {
        if (err) {
          console.log("err");

          return { message: "invalid token", status: 401 };
        } else {
          request.userID = decoded.ID;
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

export const jwtCreate = (ID: any) => {
  const accessToken = jwt.sign({ ID }, process.env.ACCESS_TOKEN_SECRET, {
    noTimestamp: true,
    expiresIn: "1y",
  });
  return accessToken;
};
