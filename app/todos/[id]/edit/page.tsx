"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TodoEditPageProps = {
  params: Promise<{ id: string }>;
};
const TodoEditPage = ({ params }: TodoEditPageProps) => {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("TODO");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(`/api/todos/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setStatus(data.status);
      setDeadline(data.deadline ? data.deadline.slice(0, 10) : "");
    };
    fetchTodo();
  }, [id]);
  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        status,
        deadline,
      }),
    });
    router.push("/todos/");
  };
  return (
    <div className="w-full max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow-md">
      <Link
        href="/todos"
        className="inline-block mb-4 text-blue-500 hover:underline"
      >
        一覧に戻る
      </Link>
      <form onSubmit={handleSubmit} className="mb-4 space-y-3">
        <label>タイトル(50文字以内)</label>
        <input
          maxLength={50}
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <label>内容(100文字以内)</label>
        <textarea
          maxLength={100}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <label>ステータス</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="TODO">未着手</option>
          <option value="DOING">進行中</option>
          <option value="DONE">完了</option>
        </select>

        <label>期限</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="px-4 py-2 block mx-auto text-white bg-blue-500 rounded transform hover:bg-blue-600 duration-200 cursor-pointer active:scale-95"
        >
          保存
        </button>
      </form>
    </div>
  );
};

export default TodoEditPage;
