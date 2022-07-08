import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
    const allBookmarks = await prisma.bookmark.findMany()
    console.log(allBookmarks)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })