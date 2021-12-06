import express, { json, Request, Response } from "express";
import { ProductRoutes } from "./routes/ProductRoutes";
import swaggerUI from "swagger-ui-express";
import "dotenv/config";
import { UserRoutes } from "./routes/UserRoutes";
import { RouteModelServer } from "./entity/RoutesModel";
import * as swaggerDocs from "../swagger.json";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(json());
app.use(cors());

UserRoutes.forEach((route: RouteModelServer) => {
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
          .then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          )
          .catch(() => next());
      } else if (result !== null && result !== undefined) {
        return res.json(result);
      }
    }
  );
});
ProductRoutes.forEach((route: RouteModelServer) => {
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
          .then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          )
          .catch(() => next());
      } else if (result !== null && result !== undefined) {
        return res.json(result);
      }
    }
  );
});
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
