import { createHandler } from "@typepoint/server";
import { getTodosEndpoint } from "../../shared/endpoints/todos/getTodosEndpoint";
import { getTodos } from "./todosService";

export const getTodosHandler = createHandler(
  getTodosEndpoint,
  async (context) => {
    context.response.body = await getTodos();
  }
);
