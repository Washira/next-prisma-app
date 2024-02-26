This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Installation](#installation)
  - [Docker Compose](#docker-compose)
  - [Prisma](#prisma)
    - [ติดตั้ง Prisma ด้วย](#ติดตั้ง-prisma-ด้วย)
    - [Setting](#setting)
    - [สร้าง Migration](#สร้าง-migration)
- [Create APIs](#create-apis)


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

