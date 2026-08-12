import prisma from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (body.title.trim() === "" || body.content.trim() === "") {
    return Response.json(
      { error: "タイトルと内容を入力してください" },
      { status: 400 },
    );
  }

  if (body.title.length > 50 || body.content.length > 100) {
    return Response.json(
      { error: "文字数制限を超えています" },
      { status: 400 },
    );
  }
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      content: body.content,
      status: body.status,
    },
  });
  return Response.json(todo);
}
