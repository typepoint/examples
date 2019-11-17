import * as jf from "joiful";
import { defineEndpoint, Empty } from "@typepoint/shared";
import { arrayOf } from "@typepoint/shared";

export class BulkPatchTodoValues {
  @(jf.string().required())
  id!: string;

  @(jf.boolean().required())
  completed!: boolean;
}

export const BulkPatchTodosRequestBody = arrayOf(BulkPatchTodoValues);

export const bulkPatchTodosEndpoint = defineEndpoint({
  method: "patch",
  path: path => path.literal("api/todos"),
  requestParams: Empty,
  requestBody: BulkPatchTodosRequestBody,
  responseBody: Empty
});
