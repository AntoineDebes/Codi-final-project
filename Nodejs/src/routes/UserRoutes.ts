import { jwtVerify } from "./../middleware/jwt";
import { UserController } from "../controller/UserController";

export const UserRoutes = [
  {
    method: "post",
    route: "/EmailVerification",
    middleware: [jwtVerify],
    controller: UserController,
    action: "EmailVerification",
  },
  {
    method: "post",
    route: "/userRegister",
    controller: UserController,
    action: "register",
  },
  {
    method: "delete",
    route: "/users",
    middleware: [jwtVerify],
    controller: UserController,
    action: "delete",
  },
  {
    method: "post",
    route: "/userLogin",
    controller: UserController,
    action: "login",
  },
];
