"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";

const CreateTodoPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("TODO");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        status,
      }),
    });
  };

  return (
    <div className="py-8">
      <div className="w-full max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow-md">
        <Link
          href="/todos"
          className="inline-block mb-4 text-blue-500 hover:underline"
        >
          一覧に戻る
        </Link>
        <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
          <label>タイトル(50文字以内)</label>
          <input
            type="text"
            list="todo-title-options"
            required
            maxLength={50}
            placeholder="タイトル"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <datalist id="todo-title-options">
            <option value="買い物" />
            <option value="勉強" />
            <option value="掃除" />
          </datalist>
          <label>内容(100文字以内)</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="内容"
            required
            maxLength={100}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <select
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="TODO">未着手</option>
            <option value="DOING">進行中</option>
            <option value="DONE">完了</option>
          </select>
          <button className="px-4 py-2 block mx-auto text-white bg-blue-500 rounded transform hover:bg-blue-600 cursor-pointer duration-200 active:scale-95">
            作成
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoPage;
