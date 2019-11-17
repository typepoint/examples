import "reflect-metadata";

import * as bodyParser from "body-parser";
import { toMiddleware } from "@typepoint/express";
import { router } from "./routes";

import express = require("express");

async function initialise() {
  const app = express();
  const port = 3001;

  app.use(bodyParser.json());

  const handlerMiddleware = toMiddleware(router);
  app.use(handlerMiddleware);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API Server running at http://localhost:${port}`);
  });
}

initialise().catch(err => {
  // eslint-disable-next-line no-console
  console.log("Initialisation failed with error: ", err.message || err);
});
