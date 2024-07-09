import type { Prisma } from '@prisma/client'

export async function insertTag(value: Prisma.tagsCreateInput) {
  return await prisma.tags.create({
    data: value,
  })
}
