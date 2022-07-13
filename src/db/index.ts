import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const allBookmarks = await prisma.bookmark.findMany()

export async function main() {
  return allBookmarks
}

// main()
//   .catch((e) => {
//     console.log('Error: ', e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })