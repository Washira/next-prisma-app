import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// function GET
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id)
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })
    return Response.json(post)
  } catch (error) {
    return new Response(error as BodyInit, { status: 404 })
  }
}

// function PUT
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id)
    const { title, content, category } = await request.json()
    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        title,
        content,
        category,
      }
    })
    return Response.json(updatedPost)
  } catch (error) {
    return new Response(error as BodyInit, { status: 404 })
  }
}

// function DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id)
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId
      }
    })
    return Response.json(deletedPost)
  } catch (error) {
    return new Response(error as BodyInit, { status: 404 })
  }
}
