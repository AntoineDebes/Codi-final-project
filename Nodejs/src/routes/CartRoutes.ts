import { jwtVerify } from "./../middleware/jwt";
import { CartController } from "../controller/CartController";

export const CartRoutes = [
  {
    method: "post",
    route: "/carts",
    middleware: [jwtVerify],
    controller: CartController,
    action: "add",
  },
  {
    method: "put",
    route: "/carts",
    controller: CartController,
    action: "update",
  },
  {
    method: "delete",
    route: "/carts",
    controller: CartController,
    action: "delete",
  },
];
