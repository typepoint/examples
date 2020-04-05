import * as jf from 'joiful';
import { defineEndpoint } from '@typepoint/shared';
import { Todo } from '../../models/todo';

export class UpdateTodoRequestParams {
  @jf.string().required()
  id!: string;
}

export class UpdateTodoRequestBody {
  @jf.string().required()
  title!: string;

  @jf.boolean().required()
  completed!: boolean;
}

export const updateTodoEndpoint = defineEndpoint({
  method: 'PUT',
  path: (path) => path.literal('api/todos').param('id'),
  requestParams: UpdateTodoRequestParams,
  requestBody: UpdateTodoRequestBody,
  responseBody: Todo,
});
