import React, { useCallback, useState } from 'react';

export interface HeaderProps {
  onAddTodo: (title: string) => void;
}

export const Header = ({ onAddTodo }: HeaderProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleNewTodoTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value || '';
    setNewTodoTitle(title);
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value || '';
    if (event.key === 'Enter' && onAddTodo) {
      onAddTodo(title);
      setNewTodoTitle('');
    }
  }, [onAddTodo]);

  return (
    <header className="header">
      <h1>typepoint todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleNewTodoTitleChange}
        onKeyPress={handleKeyPress}
      />
    </header>
  );
};
