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