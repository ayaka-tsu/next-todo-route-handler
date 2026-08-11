"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TodoDetailPage = ({ params }: TodoDetailPageProps) => {
  const { id } = use(params);
  const router = useRouter();
  const [todo, setTodo] = useState<{
    id: number;
    title: string;
    content: string;
    status: "TODO" | "DOING" | "DONE";
  } | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(`/api/todos/${id}`);
      const data = await response.json();
      setTodo(data);
    };
    fetchTodo();
  }, [id]);
  const handleDelete = async () => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    router.push("/todos");
  };
  if (!todo) {
    return <p>読み込み中・・・</p>;
  }
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">TODO詳細</h1>

      <div className="border rounded-lg p-6 space-y-5">
        <div>
          <p className="text-sm font-bold mb-1">タイトル</p>
          <p className="border rounded px-3 py-2">{todo.title}</p>
        </div>

        <div>
          <p className="text-sm font-bold mb-1">内容</p>
          <p className="border rounded px-3 py-2 min-h-20">{todo.content}</p>
        </div>

        <div>
          <p className="text-sm font-bold mb-1">ステータス</p>
          <p className="border rounded px-3 py-2 min-h-20">{todo.status}</p>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            削除
          </button>

          <button
            onClick={() => router.push(`/todos/${id}/edit`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            編集
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
