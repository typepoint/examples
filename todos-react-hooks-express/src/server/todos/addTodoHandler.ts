import * as uuid from 'uuid';
import { createHandler } from '@typepoint/server';
import { addTodoEndpoint } from '../../shared/endpoints/todos/addTodoEndpoint';
import { addTodo } from './todosService';
import { Todo } from '../../shared/models/todo';

export const addTodoHandler = createHandler(addTodoEndpoint, async ({ request, response }) => {
  const todoToAdd: Todo = {
    id: uuid.v4(),
    title: request.body.title,
    completed: false,
  };
  const todo = await addTodo(todoToAdd);
  response.body = todo;
});
