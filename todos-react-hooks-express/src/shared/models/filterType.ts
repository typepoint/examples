import { Todo } from './todo';

export const filterTypes = ['all', 'active', 'completed'] as const;

export type FilterType = typeof filterTypes[number];

export const filterTodos = (todos: Todo[], filterType: FilterType) => {
  switch (filterType) {
    case 'active': return todos.filter((todo) => !todo.completed);
    case 'completed': return todos.filter((todo) => todo.completed);
    default: return todos;
  }
};
