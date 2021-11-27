import * as express from "express";
import { json, Request, Response } from "express";
import * as bodyParser from "body-parser";
import "dotenv/config";
import { UserRoutes } from "./routes/UserRoutes";

const app = express.default();
var cors = require("cors");
const port = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

UserRoutes.forEach((route) => {
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
          .catch((err) => next());
      } else if (result !== null && result !== undefined) {
        return res.json(result);
      }
    }
  );
});
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
