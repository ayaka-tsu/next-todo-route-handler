"use client";

import { useTodoContext } from "../context/TodoContext";
import type { Todo as TodoType } from "@/app/generated/prisma/client";
import Todo from "./Todo";

interface TodoListProps {
  todos: TodoType[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const { filter, setFilter, sort, setSort } = useTodoContext();
  const filterTodos =
    filter === "ALL" ? todos : todos.filter((todo) => todo.status === filter);
  const sortedTodos = [...filterTodos].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    return sort === "NEW" ? bTime - aTime : aTime - bTime;
  });
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="ALL">全て</option>
          <option value="TODO">未着手</option>
          <option value="DOING">進行中</option>
          <option value="DONE">完了</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="NEW">新しい順</option>
          <option value="OLD">古い順</option>
        </select>
      </div>
      <ul className="space-y-3">
        {sortedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
