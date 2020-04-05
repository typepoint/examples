import "reflect-metadata";
import React, { useCallback, useMemo, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Todo } from "../shared/models/todo";
import apiClient from "../shared/apiClient";
import { TodoList } from "../components/todoList";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import Styles from "components/styles";
import {
  filterTypes,
  FilterType,
  filterTodos,
} from "../shared/models/filterType";
import { addTodoEndpoint } from "../shared/endpoints/todos/addTodoEndpoint";
import { getTodosEndpoint } from "../shared/endpoints/todos/getTodosEndpoint";
import { deleteTodoEndpoint } from "../shared/endpoints/todos/deleteTodoEndpoint";
import { patchTodoEndpoint } from "../shared/endpoints/todos/patchTodoEndpoint";
import { bulkPatchTodosEndpoint } from "../shared/endpoints/todos/bulkUpdateTodosEndpoint";
import { clearCompletedTodosEndpoint } from "../shared/endpoints/todos/clearCompletedTodosEndpoint";

const parseFilterTypeQueryValue = (
  value: string | string[] | null | undefined
) => {
  const valueAsString = `${value || ""}`.toLowerCase();
  if (filterTypes.map(String).includes(valueAsString)) {
    return valueAsString as FilterType;
  }
  return "all";
};

type IndexPageProps = {
  todos?: Todo[];
  filterType: FilterType;
};

const IndexPage: NextPage<IndexPageProps> = ({
  todos: initialTodos = [],
  filterType: initialFilterType,
}) => {
  const [todos, setTodos] = useState(initialTodos);
  const [filterType, setFilterType] = useState(initialFilterType);
  const visibleTodos = useMemo(() => filterTodos(todos, filterType), [
    todos,
    filterType,
  ]);

  const refreshTodos = useCallback(async () => {
    const { body: todos } = await apiClient.fetch(getTodosEndpoint);
    setTodos(todos);
  }, []);

  const addTodo = useCallback(async (title: string) => {
    await apiClient.fetch(addTodoEndpoint, {
      body: { title },
    });
    await refreshTodos();
  }, []);

  const updateTodoTitle = useCallback(async (id: string, title: string) => {
    await apiClient.fetch(patchTodoEndpoint, {
      params: { id },
      body: { title },
    });
    await refreshTodos();
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    await apiClient.fetch(deleteTodoEndpoint, {
      params: { id },
    });
    await refreshTodos();
  }, []);

  const clearCompletedTodos = useCallback(async () => {
    await apiClient.fetch(clearCompletedTodosEndpoint);
    await refreshTodos();
  }, []);

  const toggleTodo = useCallback(async (id: string, completed: boolean) => {
    await apiClient.fetch(patchTodoEndpoint, {
      params: { id },
      body: { completed },
    });
    await refreshTodos();
  }, []);

  const toggleAll = useCallback(async () => {
    const hasActiveTodos = todos.some((todo) => !todo.completed);
    const completed = hasActiveTodos;
    const todoValues = todos.map(({ id }) => ({ id, completed }));

    await apiClient.fetch(bulkPatchTodosEndpoint, {
      body: todoValues,
    });
  }, [todos]);

  return (
    <section className="todoapp">
      <Head>
        <title>TypePoint + Next.js Todo App</title>
      </Head>
      <div>
        <Styles />
        <Header onAddTodo={addTodo} />
        <TodoList
          todos={visibleTodos}
          onSetTodoTitle={updateTodoTitle}
          onDeleteTodo={deleteTodo}
          onToggleAll={toggleAll}
          onToggleTodo={toggleTodo}
        />
        <Footer
          filterType={filterType}
          onClearCompleted={clearCompletedTodos}
          onSetFilterType={setFilterType}
          todos={todos}
        />
      </div>
    </section>
  );
};

IndexPage.getInitialProps = async ({ query }): Promise<IndexPageProps> => {
  const filterType = parseFilterTypeQueryValue(query.filter);
  const response = await apiClient.fetch(getTodosEndpoint);
  return { todos: response.body, filterType };
};

export default IndexPage;
