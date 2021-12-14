import { Request } from "express";
export interface GetUserAuthInfoRequest extends Request {
  userID?: string;
}

export interface GetProductInfoRequest extends Request {
  userID?: string;
  productID?: string;
}
