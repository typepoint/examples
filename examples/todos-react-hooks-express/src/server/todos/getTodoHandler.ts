import { NOT_FOUND } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { getTodoEndpoint } from '../../shared/endpoints/todos/getTodoEndpoint';
import { findTodo } from './todosService';

export const getTodoHandler = createHandler(getTodoEndpoint, async ({ request, response }) => {
  const todo = await findTodo(request.params.id);

  if (!todo) {
    response.statusCode = NOT_FOUND;
  } else {
    response.body = todo;
  }
});
