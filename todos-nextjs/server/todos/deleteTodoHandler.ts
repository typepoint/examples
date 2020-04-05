import { NO_CONTENT } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { deleteTodoEndpoint } from '../../shared/endpoints/todos/deleteTodoEndpoint';
import { deleteTodo } from './todosService';

export const deleteTodoHandler = createHandler(deleteTodoEndpoint, async (context) => {
  await deleteTodo(context.request.params.id);
  context.response.statusCode = NO_CONTENT;
});
