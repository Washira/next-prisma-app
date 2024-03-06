This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Configuration](#configuration)
- [Installation](#installation)
  - [Docker Compose](#docker-compose)
  - [Prisma](#prisma)
    - [ติดตั้ง Prisma ด้วย](#ติดตั้ง-prisma-ด้วย)
    - [Setting](#setting)
    - [สร้าง Migration](#สร้าง-migration)
    - [เพิ่ม Migration ใหม่](#เพิ่ม-migration-ใหม่)
- [Create APIs](#create-apis)
  - [method ที่ใช้](#method-ที่ใช้)
    - [Static route](#static-route)
    - [Dynamic route](#dynamic-route)
- [Frontend](#frontend)
- [ปรับ APIs เพื่อให้ Search และ Filter ได้](#ปรับ-apis-เพื่อให้-search-และ-filter-ได้)
  - [ใช้ `NextRequest` ในการรับค่าจาก query string](#ใช้-nextrequest-ในการรับค่าจาก-query-string)
- [ทำ CRUD API ของ Category](#ทำ-crud-api-ของ-category)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Configuration

เมื่อสร้างโปรเจคใหม่ ให้ตอบคำถามตามนี้

```bash
What is your project named? … next-prisma-app
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … No
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … Yes
✔ What import alias would you like configured? … @/*
```

## Installation

### Docker Compose

รันคำสั่ง `docker-compose up -d`

### Prisma

#### ติดตั้ง Prisma ด้วย

```bash
npm install prisma --save-dev
npm install @prisma/client
```

สร้างไฟล์เริ่มต้นของ Prisma

```bash
npx prisma init
```

#### Setting

เปลี่ยน `DATABASE_URL` ใน `.env` ให้ตรงกับ username, password ของ database ของเรา

#### สร้าง Migration

Migration คือ version control ของ database

สร้าง Migration สำหรับ database ด้วย

```bash
npx prisma migrate dev --name <MIGRATE_NAME>
```

ยกตัวอย่าง เช่น `npx prisma migrate dev --name "Create Post Table"`

จะได้ folder ที่เป็น migration ใน `prisma/migrations` folder ชื่อว่า `<time_stamp>_create_post_table` และ ไฟล์ `migration_lock.toml`

#### เพิ่ม Migration ใหม่

มี 2 วิธีในการเพิ่ม migration ใหม่ คือ

1. ถ้าต้องการเพิ่ม field ที่ไม่มี value ด้วย ให้เพิ่ม field ใน `schema.prisma` และสร้าง migration ใหม่ อาจจะให้ field นั้นเป็น `null` โดยการใส่ `?` หลังชื่อ field ใน `schema.prisma` เช่น

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  category string? // เพิ่ม field ใหม่ สามารถเป็น null ได้
  createdAt DateTime @default(now())
}
```

แล้วรันคำสั่ง `npx prisma migrate dev --name <MIGRATE_NAME>` อีกครั้ง

2. ถ้าต้องการเพิ่ม field ที่มี value ด้วย ให้เพิ่ม field ใน `schema.prisma` และสร้าง migration ใหม่ ให้เพิ่ม `--create-only` ด้วย

```bash
npx prisma migrate dev --name <MIGRATE_NAME> --create-only
```

จะมีการถามให้ยืนยันการสร้าง migration

```bash
✔ Are you sure you want to create this migration? … yes
```

เนื่องจากเราใช้ `--create-only` จะไม่มีการสร้าง field ใหม่ใน database จริง ๆ แต่จะสร้าง migration ใหม่ใน `prisma/migrations` folder เท่านั้น ทำให้เราต้องรัน `npx prisma migrate dev` อีกครั้งเพื่อทำการสร้าง field ใหม่ใน database

```bash
npx prisma migrate dev
```

แต่จะมี error เพราะว่ามี field ที่ไม่มีค่าใน database ให้เราทำการเพิ่มค่าให้กับ field ที่เพิ่มใหม่ และรัน `npx prisma migrate dev` อีกครั้ง

หลังจากนั่้น จะมีข้อความให้ยืนยันว่า เรายอมรับที่ข้อมูลจะถูกลบทั้งหมด

```bash
Do you want to continue? All data will be lost. … yes
```

จากนั้นจะมีการสร้าง migration ใหม่ และ field ใหม่จะถูกเพิ่มใน database

## Create APIs

สร้าง APIs ด้วย Prisma Client ใน `api` folder

Layout ของ APIs จะเป็นแบบนี้
  
```
api
├── posts
│   ├── [id]
│   │   └── route.ts
│   └── route.ts
└── users
    ├── [id]
    │   └── route.ts
    └── route.ts
```

### method ที่ใช้

แบ่งเป็น 2 แบบคือ Static route และ Dynamic route

#### Static route

ใน app สร้าง `api/posts/route.ts` เป็น folder สำหรับเก็บ APIs ที่เกี่ยวกับ Post

- `GET` `api/posts` สำหรับดึงข้อมูล: สร้าง function `GET()`
- `POST` `api/posts` สำหรับสร้างข้อมูล: สร้าง function `POST()`

#### Dynamic route

สร้าง folder `api/posts/[id]/routs.ts` สำหรับเก็บ APIs ที่เกี่ยวกับ Post ตาม id

- `GET` `api/posts/:id` สำหรับดึงข้อมูลตาม id: สร้าง function `GET()`
- `PUT` `api/posts/:id` สำหรับแก้ไขข้อมูลตาม id: สร้าง function `PUT()`
- `DELETE` `api/posts/:id` สำหรับลบข้อมูลตาม id: สร้าง function `DELETE()`

## Frontend

Layout ของ Frontend จะประกอบไปด้วย

```
├── app
    ├── api --> API จากส่วนก่อนหน้านี้
    │   └── posts
    │       ├── [id]
    │       │   └── route.ts
    │       └── route.ts
    ├── components
    │   └── PostForm.tsx
    ├── create
    │   └── page.tsx
    ├── edit
    │   └── [id]
    │       └── page.tsx
    └── page.tsx
```

- `app/components` สำหรับเก็บ component ที่ใช้ซ้ำ
- `app/components/PostForm.tsx` สำหรับเก็บ form สำหรับสร้างและแก้ไขข้อมูล
- `app/create` คือ page สำหรับสร้างข้อมูล
- `app/create/page.tsx` สำหรับเก็บ page สำหรับสร้างข้อมูล
- `app/edit` คือ page สำหรับแก้ไขข้อมูล
- `app/edit/[id]/page.tsx` คือ page สำหรับแก้ไขข้อมูล ตาม id
- `app/page.tsx` สำหรับเก็บ page หลัก

## ปรับ APIs เพื่อให้ Search และ Filter ได้

เพิ่ม function สำหรับ search และ filter ใน `api/posts/route.ts`

### ใช้ `NextRequest` ในการรับค่าจาก query string

ใช้ `NextRequest` ที่เป็น interface ในการรับค่าจาก query string

```ts
import { NextRequest } from 'next/server'

export default async function GET(req: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') // ทำการรับ search จาก query string
  const filter = searchParams.get('filter')
  // ทำการ filter ข้อมูลตาม search และ filter
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: search, // ค้นหา post ที่มี search เป็น substring ใน title
        mode: 'insensitive', // ไม่สนใจตัวเล็กตัวใหญ่
      },
    }
  })
  return posts
}
```

## ทำ CRUD API ของ Category

สร้าง APIs สำหรับ Category ใน `api/categories/route.ts`

```
├── app
    ├── api
        ├── categories --> ส่วนที่เพิ่มเข้ามา
        │   ├── [id]
        │   │   └── route.ts
        │   └── route.ts
        └── posts
            ├── [id]
            │   └── route.ts
            └── route.ts
```