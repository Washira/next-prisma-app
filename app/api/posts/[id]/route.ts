import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// function GET
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id)
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })
  return Response.json(post)
}

// function PUT
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id)
  const { title, content } = await request.json()
  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title,
      content
    }
  })
  return Response.json(updatedPost)
}

// function DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id)
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId
    }
  })
  return Response.json(deletedPost)
}
