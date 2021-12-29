import { isAdmin } from "./../middleware/isAdmin";
import { jwtVerify } from "./../middleware/jwt";
import { ProductController } from "../controller/ProductController";
import multerUpload from "../middleware/multer";

const upload = multerUpload({ destination: "upload" });

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
    middleware: [jwtVerify, isAdmin, upload.single("image")],
    controller: ProductController,
    action: "add",
  },
  {
    method: "delete",
    route: "/products",
    middleware: [jwtVerify, isAdmin],
    controller: ProductController,
    action: "delete",
  },
];
