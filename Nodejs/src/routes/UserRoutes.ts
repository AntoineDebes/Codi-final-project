import { jwtVerify, jwtCreate } from "./../middleware/jwt";
import { UserController } from "../controller/UserController";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    // middleware: jwtVerify,
    controller: UserController,
    action: "all",
  },
  {
    method: "post",
    route: "/EmailVerification",
    middleware: [jwtVerify],
    controller: UserController,
    action: "EmailVerification",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "post",
    route: "/userLogIn",
    controller: UserController,
    action: "login",
  },
];
