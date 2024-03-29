import express, { json, Request, Response, Router, urlencoded } from "express";
import { ProductRoutes } from "./routes/ProductRoutes";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import { UserRoutes } from "./routes/UserRoutes";
import { CartRoutes } from "./routes/CartRoutes";
import { RouteModelServer } from "./entity/RoutesModel";
import * as swaggerDocs from "../swagger.json";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
app.use("/upload", express.static("./upload"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "10mb" }));
app.use(cors());

// app.post("/testing", (req: Request, res: Response) => {
//   return res.json({ ...req.file });
// });

const Routers = [UserRoutes, ProductRoutes, CartRoutes];

Routers.forEach((router: any) => {
  router.forEach((route: RouteModelServer) => {
    (app as any)[route.method](
      route.route,
      route.middleware ?? [],
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          return result
            .then((result) => (!!result ? res.send(result) : undefined))
            .catch(() => next());
        } else if (!!result) {
          return res.json(result);
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
