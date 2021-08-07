import next from "next";
import { toMiddleware } from "@typepoint/express";
import express from "express";
import { router } from "./routes";
import * as bodyParser from "body-parser";

async function initialize() {
  const port = parseInt(process.env.PORT || "3000", 10);
  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({ dev });
  await nextApp.prepare();

  const expressApp = express();
  expressApp.use(bodyParser.json());

  const apiMiddleware = toMiddleware(router);
  expressApp.use(apiMiddleware);

  const nextRequestHandler = nextApp.getRequestHandler();
  expressApp.get("*", (req, res) => nextRequestHandler(req, res));

  expressApp.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
}

initialize();
