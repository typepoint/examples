import * as React from "react";
import Link from "next/link";
import { Todo } from "../shared/models/todo";
import { FilterType, filterTypes } from "../shared/models/filterType";

const { useCallback } = React;

export interface FooterProps {
  filterType: FilterType;
  onSetFilterType: (filterType: FilterType) => void;
  onClearCompleted: () => void;
  todos: Todo[];
}

export const Footer = ({
  filterType: selectedFilterType,
  onClearCompleted,
  onSetFilterType,
  todos,
}: FooterProps) => {
  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>
        <span> </span>
        <span>items left</span>
      </span>
      <ul className="filters">
        {filterTypes.map((filterType) => (
          <FilterListItem
            filterType={filterType}
            key={filterType}
            onSetFilterType={onSetFilterType}
            selected={filterType === selectedFilterType}
          />
        ))}
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

const getFilterTypeTitle = (filterType: FilterType) =>
  `${filterType[0].toUpperCase()}${filterType.substr(1).toLowerCase()}`;

interface FilterListItemProps {
  filterType: FilterType;
  onSetFilterType: (filterType: FilterType) => void;
  selected: boolean;
}

const FilterListItem = ({
  filterType,
  onSetFilterType,
  selected,
}: FilterListItemProps) => {
  const setFilterType = useCallback(() => {
    onSetFilterType(filterType);
  }, [filterType, onSetFilterType]);

  return (
    <li>
      <Link href={`/?filter=${filterType}`} shallow={true}>
        <a className={selected ? "selected" : ""} onClick={setFilterType}>
          {getFilterTypeTitle(filterType)}
        </a>
      </Link>
    </li>
  );
};
