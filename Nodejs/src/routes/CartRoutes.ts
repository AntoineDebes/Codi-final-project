import { jwtVerify } from "./../middleware/jwt";
import { CartController } from "../controller/CartController";

export const ProductRoutes = [
  {
    method: "post",
    route: "/carts",
    controller: CartController,
    action: "add",
  },
  {
    method: "delete",
    route: "/carts",
    controller: CartController,
    action: "delete",
  },
];
