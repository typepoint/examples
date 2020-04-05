import { defineEndpoint, Empty } from "@typepoint/shared";
import { Todo } from "../../models/todo";

export const getTodosEndpoint = defineEndpoint({
  path: path => path.literal("api/todos"),
  requestParams: Empty,
  requestBody: Empty,
  responseBody: [Todo]
});
