import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// function GET

// ใช้ GET() เพื่อเป็นการขอใช้ method GET ผ่าน api/post
export function GET() {
  return Response.json({
    message: 'test'
  })
}

// function POST
export async function POST(request: Request) {
  const { title, content } = await request.json()
  const newPost = await prisma.post.create({
    data: {
      title,
      content
    }
  })
  // newPost คือข้อมูลที่เพิ่งสร้างขึ้น จะได้ id มาด้วย
  // ส่งข้อมูลกลับไปให้ผู้ใช้
  // return Response.json({
  //   data: {
  //     title,
  //     content
  //   }
  // })
  return Response.json(newPost)
}

// function PUT
