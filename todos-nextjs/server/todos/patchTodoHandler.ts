import { NOT_FOUND } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { patchTodoEndpoint } from '../../shared/endpoints/todos/patchTodoEndpoint';
import { patchTodo, findTodo } from './todosService';

export const patchTodoHandler = createHandler(patchTodoEndpoint, async ({ request, response }) => {
  const { id } = request.params;
  const todoToUpdate = await findTodo(id);
  if (!todoToUpdate) {
    response.statusCode = NOT_FOUND;
    return;
  }

  response.body = await patchTodo(id, request.body);
});
