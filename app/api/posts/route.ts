import { PrismaClient } from '@prisma/client'
import {NextRequest } from 'next/server'

const prisma = new PrismaClient()

// function GET

// ใช้ GET() เพื่อเป็นการขอใช้ method GET ผ่าน api/post
export async function GET(request: NextRequest) {
  // searchParams คือ query string ที่ส่งมากับ request
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || ''
  const categoryId = searchParams.get('categoryId') // หากไม่มี category จะไม่ใช้ค่านี้
  const sort = searchParams.get('sort') || 'desc'

  const whereCondition = categoryId ? {
    categoryId: Number(categoryId),
    title: {
      contains: search, // ค้นหา post ที่มี search เป็น substring ใน title
      mode: 'insensitive', // ไม่สนใจตัวเล็กตัวใหญ่
    },
  } : {
    title: {
      contains: search,
      mode: 'insensitive',
    }
  }
  const posts = await prisma.post.findMany({
    where: whereCondition as any,   // ใส่ any เพราะ where ไม่รองรับ type ที่เราสร้างให้ เราจึงใส่ any เพื่อให้ type ของ where ถูกกำหนดจากปลายทาง
    orderBy: {
      createdAt: sort
    } as any,   // ใส่ any เพราะ orderBy ไม่รองรับการใส่ string โดยตรง เราจึงใส่ any เพื่อให้ type ถูกกำหนดจากปลายทาง
    include: {
      category: true
    }  // ใส่ true เพื่อให้ดึงข้อมูล category มาด้วย
  })
  return Response.json(posts)
}

// function POST
export async function POST(request: Request) {
  const { title, content, categoryId } = await request.json()
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      categoryId: Number(categoryId),
    }
  })
  // newPost คือข้อมูลที่เพิ่งสร้างขึ้น จะได้ id มาด้วย
  // ส่งข้อมูลกลับไปให้ผู้ใช้
  return Response.json(newPost)
}
