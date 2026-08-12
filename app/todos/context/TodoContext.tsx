"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type TodoContextType = {
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);
export function TodoProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("NEW");

  return (
    <TodoContext.Provider value={{ filter, setFilter, sort, setSort }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
}
