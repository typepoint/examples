import chalk from "chalk";
import {
  addHeadersMiddleware,
  createMiddleware,
  Router,
} from "@typepoint/server";
import { getValidateAndTransformFunction } from "@typepoint/joiful";
import { addTodoHandler } from "./todos/addTodoHandler";
import { clearCompletedTodosHandler } from "./todos/clearCompletedTodos";
import { deleteTodoHandler } from "./todos/deleteTodoHandler";
import { getTodoHandler } from "./todos/getTodoHandler";
import { getTodosHandler } from "./todos/getTodosHandler";
import { updateTodoHandler } from "./todos/updateTodoHandler";
import { patchTodoHandler } from "./todos/patchTodoHandler";
import { bulkPatchTodosHandler } from "./todos/bulkPatchTodosHandler";

export const router = new Router({
  handlers: [
    addTodoHandler,
    bulkPatchTodosHandler,
    clearCompletedTodosHandler,
    deleteTodoHandler,
    getTodoHandler,
    getTodosHandler,
    updateTodoHandler,
    patchTodoHandler,
  ],
  middleware: [
    createMiddleware(async ({ request }, next) => {
      if (request.url.startsWith("/api/")) {
        await next();
      }
    }, "ApiFilterMiddleware"),
    createMiddleware(async ({ request }, next) => {
      console.log(`${request.method}: ${chalk.yellow(request.url)}`);
      try {
        await next();
      } catch (err) {
        console.error(chalk.red(String(err) || err.message));
        throw err;
      }
    }, "LoggerMiddleware"),
    addHeadersMiddleware({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    }),
    createMiddleware(async ({ request, response }, next) => {
      if (request.method.toLowerCase() === "options") {
        response.header("Access-Control-Allow-Origin", "*");
        response.header(
          "Access-Control-Allow-Methods",
          "GET,PATCH,PUT,POST,DELETE,OPTIONS"
        );
        response.header(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization, Content-Length, X-Requested-With"
        );
        response.statusCode = 200;
        return;
      }
      await next();
    }, "OptionsMiddleware"),
  ],
  validateAndTransform: getValidateAndTransformFunction(),
});
