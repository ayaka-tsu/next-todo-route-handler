import prisma from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      content: body.content,
      status: body.status,
      deadline: new Date(body.deadline),
    },
  });
  return Response.json(todo);
}
