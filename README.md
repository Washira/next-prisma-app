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
- [Create APIs](#create-apis)
  - [method ที่ใช้](#method-ที่ใช้)
    - [Static route](#static-route)
    - [Dynamic route](#dynamic-route)
- [Frontend](#frontend)


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

```
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

```
npm install prisma --save-dev
npm install @prisma/client
```

สร้างไฟล์เริ่มต้นของ Prisma

```
npx prisma init
```

#### Setting

เปลี่ยน `DATABASE_URL` ใน `.env` ให้ตรงกับ username, password ของ database ของเรา

#### สร้าง Migration

Migration คือ version control ของ database

สร้าง Migration สำหรับ database ด้วย

```
npx prisma migrate dev --name <ชื่อ migrate>
```

ยกตัวอย่าง เช่น `npx prisma migrate dev --name "Create Post Table"`

จะได้ folder ที่เป็น migration ใน `prisma/migrations` folder ชื่อว่า `<time_stamp>_create_post_table` และ ไฟล์ `migration_lock.toml`

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
    ├── create
    │   └── page.tsx
    ├── edit
    │   └── [id]
    │       └── page.tsx
    └── page.tsx
```
