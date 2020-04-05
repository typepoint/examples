import { NO_CONTENT } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { clearCompletedTodosEndpoint } from '../../shared/endpoints/todos/clearCompletedTodosEndpoint';
import { clearCompletedTodos } from './todosService';

export const clearCompletedTodosHandler = createHandler(clearCompletedTodosEndpoint, async (context) => {
  await clearCompletedTodos();
  context.response.statusCode = NO_CONTENT;
});
