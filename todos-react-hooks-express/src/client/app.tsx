import * as React from 'react';
import { useEndpoint, useEndpointLazily } from '@typepoint/react';
import { Header } from './header';
import { TodoList } from './todoList';
import { Footer } from './footer';
import { FilterType, filterTodos } from '../shared/models/filterType';
import { getTodosEndpoint } from '../shared/endpoints/todos/getTodosEndpoint';
import { addTodoEndpoint } from '../shared/endpoints/todos/addTodoEndpoint';
import { deleteTodoEndpoint } from '../shared/endpoints/todos/deleteTodoEndpoint';
import { patchTodoEndpoint } from '../shared/endpoints/todos/patchTodoEndpoint';
import { clearCompletedTodosEndpoint } from '../shared/endpoints/todos/clearCompletedTodosEndpoint';
import { bulkPatchTodosEndpoint } from '../shared/endpoints/todos/bulkUpdateTodosEndpoint';

const {
  memo, useCallback, useState, useMemo,
} = React;

const noop = () => {};

export const App = memo(() => {
  const { response, refetch } = useEndpoint(getTodosEndpoint, {});
  const todos = (response && response.body) || [];

  const [filterType, setFilterType] = useState('all' as FilterType);

  const visibleTodos = useMemo(() => filterTodos(todos, filterType), [filterType, todos]);

  const { fetch: addTodo } = useEndpointLazily(addTodoEndpoint);
  const addTodoWithTitle = useCallback(async (title: string) => {
    await addTodo({ body: { title } })
      .promise()
      .then(refetch, noop);
  }, [addTodo, refetch]);

  const { fetch: clearCompletedTodos } = useEndpointLazily(clearCompletedTodosEndpoint);
  const clearCompletedAndRefetch = useCallback(async () => {
    await clearCompletedTodos()
      .promise()
      .then(refetch, noop);
  }, [clearCompletedTodos, refetch]);

  const { fetch: deleteTodo } = useEndpointLazily(deleteTodoEndpoint);
  const deleteTodoById = useCallback((id: string) => {
    deleteTodo({ params: { id } })
      .promise()
      .then(refetch, noop);
  }, [deleteTodo, refetch]);

  const { fetch: patchTodo } = useEndpointLazily(patchTodoEndpoint);
  const setTodoTitle = useCallback((id: string, title: string) => {
    patchTodo({ params: { id }, body: { title } })
      .promise()
      .then(refetch, noop);
  }, [patchTodo, refetch]);

  const toggleTodo = useCallback((id: string, completed: boolean) => {
    patchTodo({ params: { id }, body: { completed } })
      .promise()
      .then(refetch, noop);
  }, [patchTodo, refetch]);

  const { fetch: bulkPatchTodos } = useEndpointLazily(bulkPatchTodosEndpoint);
  const toggleAll = useCallback(async () => {
    const hasActiveTodos = todos.some((todo) => !todo.completed);
    const completed = hasActiveTodos;
    const todoValues = todos.map(({ id }) => ({ id, completed }));
    await bulkPatchTodos({ body: todoValues })
      .promise()
      .then(refetch, noop);
  }, [bulkPatchTodos, refetch, todos]);

  return (
    <section className="todoapp">
      <div>
        <Header onAddTodo={addTodoWithTitle} />
        <TodoList
          onDeleteTodo={deleteTodoById}
          onSetTodoTitle={setTodoTitle}
          onToggleAll={toggleAll}
          onToggleTodo={toggleTodo}
          todos={visibleTodos}
        />
        <Footer
          filterType={filterType}
          onClearCompleted={clearCompletedAndRefetch}
          onSetFilterType={setFilterType}
          todos={todos}
        />
      </div>
    </section>
  );
});
