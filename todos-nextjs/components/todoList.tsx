/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { memo, useCallback, useState, ChangeEvent, useRef } from "react";
import { Todo } from "../shared/models/todo";

export interface TodoListProps {
  onDeleteTodo: (id: string) => void;
  onSetTodoTitle: (id: string, title: string) => void;
  onToggleAll: () => void;
  onToggleTodo: (id: string, completed: boolean) => void;
  todos: Todo[];
}

export const TodoList = memo(
  ({
    onDeleteTodo,
    onSetTodoTitle,
    onToggleAll,
    onToggleTodo,
    todos
  }: TodoListProps) => (
    <section className="main">
      <input
        checked={!todos.some(todo => !todo.completed)}
        className="toggle-all"
        id="toggle-all"
        // onClick={onToggleAll}
        onChange={onToggleAll}
        type="checkbox"
      />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onSetTodoTitle={onSetTodoTitle}
            onToggleTodo={onToggleTodo}
          />
        ))}
      </ul>
    </section>
  )
);

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onSetTodoTitle: (id: string, title: string) => void;
  onToggleTodo: (id: string, completed: boolean) => void;
}

const TodoListItem = memo(
  ({ todo, onSetTodoTitle, onDeleteTodo, onToggleTodo }: TodoListItemProps) => {
    const [title, setTitle] = useState(todo.title);
    const [editing, setEditing] = useState(false);

    const titleInputRef = useRef<HTMLInputElement>(null);

    const enterEditMode = useCallback(() => {
      setEditing(true);

      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 0);
    }, [setEditing]);

    const handleTitleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value || "");
      },
      [setTitle]
    );

    const exitEditMode = useCallback(() => {
      onSetTodoTitle(todo.id, title);
      setEditing(false);
    }, [onSetTodoTitle, todo.id, title]);

    const deleteTodo = useCallback(() => onDeleteTodo(todo.id), [
      onDeleteTodo,
      todo.id
    ]);

    const toggleTodo = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onToggleTodo(todo.id, event.currentTarget.checked);
      },
      [onToggleTodo, todo.id]
    );

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          exitEditMode();
        }
      },
      [exitEditMode]
    );

    return (
      <li className={editing ? "editing" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={toggleTodo}
          />
          <label onClick={enterEditMode}>{todo.title}</label>
          <button type="button" className="destroy" onClick={deleteTodo} />
        </div>
        <input
          className="edit"
          onBlur={exitEditMode}
          onChange={handleTitleChange}
          onKeyPress={handleKeyPress}
          ref={titleInputRef}
          value={title}
        />
      </li>
    );
  }
);
