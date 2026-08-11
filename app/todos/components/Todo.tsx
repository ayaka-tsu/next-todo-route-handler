import type { Todo as TodoType } from "@/app/generated/prisma/client";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      <div>
        <p>{todo.title}</p>
        <p>{todo.content}</p>
        <p>{todo.status}</p>
        <p>{todo.deadline ? todo.deadline.toLocaleDateString() : "期限なし"}</p>
      </div>
    </li>
  );
};

export default Todo;
