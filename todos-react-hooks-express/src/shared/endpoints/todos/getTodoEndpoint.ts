import * as jf from 'joiful';
import { defineEndpoint, Empty } from '@typepoint/shared';
import { Todo } from '../../models/todo';

export class GetTodoRequestParams {
  @jf.string().required()
  id!: string;
}

export const getTodoEndpoint = defineEndpoint({
  path: (path) => path.literal('api/todos').param('id'),
  requestParams: GetTodoRequestParams,
  requestBody: Empty,
  responseBody: Todo,
});
