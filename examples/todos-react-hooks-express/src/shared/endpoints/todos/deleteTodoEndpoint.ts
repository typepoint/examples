import * as jf from 'joiful';
import { defineEndpoint, Empty } from '@typepoint/shared';

export class DeleteTodoRequestParams {
  @jf.string().required()
  id!: string;
}

export const deleteTodoEndpoint = defineEndpoint({
  method: 'delete',
  path: (path) => path.literal('api/todos').param('id'),
  requestParams: DeleteTodoRequestParams,
  requestBody: Empty,
  responseBody: Empty,
});
