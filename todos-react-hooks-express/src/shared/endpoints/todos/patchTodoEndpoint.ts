import * as jf from 'joiful';
import { defineEndpoint } from '@typepoint/shared';
import { Todo } from '../../models/todo';

export class PatchTodoRequestParams {
  @jf.string().required()
  id!: string;
}

export class PatchTodoRequestBody {
  @jf.string().optional()
  title?: string;

  @jf.boolean().optional()
  completed?: boolean;
}

export const patchTodoEndpoint = defineEndpoint({
  method: 'PATCH',
  path: (path) => path.literal('api/todos').param('id'),
  requestParams: PatchTodoRequestParams,
  requestBody: PatchTodoRequestBody,
  responseBody: Todo,
});
