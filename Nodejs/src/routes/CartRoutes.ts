import { jwtVerify } from "./../middleware/jwt";
import { CartController } from "../controller/CartController";

export const CartRoutes = [
  {
    method: "get",
    route: "/carts",
    middleware: [jwtVerify],
    controller: CartController,
    action: "all",
  },
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
    middleware: [jwtVerify],
    controller: CartController,
    action: "update",
  },
  {
    method: "delete",
    route: "/carts",
    middleware: [jwtVerify],
    controller: CartController,
    action: "delete",
  },
];
