import { TodoProvider } from "./context/TodoContext";
import Link from "next/link";
import type { Todo } from "@/app/generated/prisma/client";
import TodoList from "./components/TodoList";

const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:3000/api/todos");
  const todos = await res.json();
  return todos;
};

export default async function TodosPage() {
  const todos = await getTodos();
  return (
    <main className="flex flex-col items-center min-h-screen py-8">
      <h1 className="text-4xl font-bold text-gray-700">TODO一覧</h1>
      <Link
        href="/todos/create"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 duration-200"
      >
        新規作成
      </Link>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <TodoProvider>
          <TodoList todos={todos} />
          </TodoProvider>
        </div>
      </div>
    </main>
  );
}
