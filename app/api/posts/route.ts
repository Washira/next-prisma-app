// ใช้ GET() เพื่อเป็นการขอใช้ method GET ผ่าน api/post

export function GET() {
  return Response.json({
    message: 'test'
  })
}