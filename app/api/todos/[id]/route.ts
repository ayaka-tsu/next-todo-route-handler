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
