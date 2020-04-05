import { NO_CONTENT } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { bulkPatchTodosEndpoint } from '../../shared/endpoints/todos/bulkUpdateTodosEndpoint';
import { bulkPatchTodos } from './todosService';

export const bulkPatchTodosHandler = createHandler(bulkPatchTodosEndpoint, async ({ request, response }) => {
  await bulkPatchTodos(request.body);
  response.statusCode = NO_CONTENT;
});
