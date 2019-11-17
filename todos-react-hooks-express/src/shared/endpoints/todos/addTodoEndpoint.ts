import * as jf from 'joiful';
import { defineEndpoint, Empty } from '@typepoint/shared';
import { Todo } from '../../models/todo';

export class AddTodoRequestBody {
  @jf.string().required()
  title!: string;
}

export const addTodoEndpoint = defineEndpoint({
  method: 'post',
  path: (path) => path.literal('api/todos'),
  requestParams: Empty,
  requestBody: AddTodoRequestBody,
  responseBody: Todo,
});
