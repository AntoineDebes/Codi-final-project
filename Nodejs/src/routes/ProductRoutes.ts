import { jwtVerify } from "./../middleware/jwt";
import { ProductController } from "../controller/ProductController";

export const ProductRoutes = [
  {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "getAll",
  },
  {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "add",
  },
  {
    method: "delete",
    route: "/products",
    controller: ProductController,
    action: "delete",
  },
];
