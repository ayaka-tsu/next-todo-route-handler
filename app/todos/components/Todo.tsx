import Link from "next/link";
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
        <p>
          <Link href={`/todos/${todo.id}`} className="hover:text-blue-500">
            {todo.title}
          </Link>
        </p>
        <p>{todo.content}</p>
        <p>
          {todo.status === "TODO"
            ? "未着手"
            : todo.status === "DOING"
              ? "進行中"
              : "完了"}
        </p>
        {/* <p>{todo.deadline ? todo.deadline.toLocaleDateString() : "期限なし"}</p> */}
      </div>
    </li>
  );
};

export default Todo;
