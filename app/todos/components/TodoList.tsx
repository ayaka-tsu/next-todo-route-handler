import type { Todo as TodoType } from "@/app/generated/prisma/client";
import Todo from "./Todo";

interface TodoListProps {
  todos: TodoType[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
