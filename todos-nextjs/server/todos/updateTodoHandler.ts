import { NOT_FOUND } from 'http-status-codes';
import { createHandler } from '@typepoint/server';
import { updateTodoEndpoint } from '../../shared/endpoints/todos/updateTodoEndpoint';
import { updateTodo, findTodo } from './todosService';

export const updateTodoHandler = createHandler(updateTodoEndpoint, async (context) => {
  const todoToUpdate = await findTodo(context.request.params.id);
  if (!todoToUpdate) {
    context.response.statusCode = NOT_FOUND;
    return;
  }

  todoToUpdate.title = context.request.body.title;
  todoToUpdate.completed = context.request.body.completed;
  await updateTodo(todoToUpdate);
  context.response.body = todoToUpdate;
});
