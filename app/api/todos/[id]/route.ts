import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id),
    },
  });
  return Response.json(todo);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  if (body.title.length > 50 || body.content.length > 100) {
    return Response.json(
      { error: "文字数制限を超えています" },
      { status: 400 },
    );
  }

  const todo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      content: body.content,
      status: body.status,
      deadline: body.deadline ? new Date(body.deadline) : null,
    },
  });
  return Response.json(todo);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  return Response.json(todo);
}
