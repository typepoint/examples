import { Todo } from '../../shared/models/todo';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const db = {
  todos: [
    {
      id: '5066e7cf-a7e4-40fa-9f73-6fcb2e955f56',
      title: 'Write todo app',
      completed: true,
    },
    {
      id: '18075fbc-5bb6-40d3-b427-6b1c73b768fe',
      title: 'Put out the garbage',
      completed: false,
    },
    {
      id: 'b6f605a3-f412-4486-a0a6-452bbf180836',
      title: 'Feed the cats',
      completed: false,
    },
    {
      id: 'e2b9aec2-4f94-465a-b819-9f1d1aacce9b',
      title: 'Do the things',
      completed: false,
    },
  ] as Todo[],
};

const readTodos = async () => [...db.todos];

const writeTodos = async (todos: Todo[]) => {
  db.todos = todos;
};

export const findTodo = async (id: string) => (await readTodos()).find((todo) => todo.id === id);

export const addTodo = async (todo: Todo) => {
  const todos = await readTodos();
  const updatedTodos = [...todos, todo];
  await writeTodos(updatedTodos);
  return todo;
};

export const bulkPatchTodos = async (todoValues: Partial<Omit<Todo, 'title'>>[]) => {
  const todos = await readTodos();
  const updatedTodos = todos.map(
    (existing) => ({
      ...existing,
      ...todoValues.find((todo) => todo.id === existing.id),
    }),
  );
  await writeTodos(updatedTodos);
};

export const patchTodo = async (id: string, values: Partial<Omit<Todo, 'id'>>) => {
  const todos = await readTodos();
  const updatedTodos = todos.map(
    (existing) => (existing.id === id ? { ...existing, ...values } : existing),
  );
  await writeTodos(updatedTodos);

  const patchedTodo = await findTodo(id);
  return patchedTodo;
};

export const updateTodo = async (todo: Todo) => {
  const todos = await readTodos();
  const updatedTodos = todos.map((existing) => (existing.id === todo.id ? todo : existing));
  await writeTodos(updatedTodos);
};

export const getTodos = () => readTodos();

export const deleteTodo = async (id: string) => {
  const todos = await readTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  writeTodos(updatedTodos);
};

export const clearCompletedTodos = async () => {
  const todos = await readTodos();
  const activeTodos = todos.filter((todo) => !todo.completed);
  await writeTodos(activeTodos);
};
