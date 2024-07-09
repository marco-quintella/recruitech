import type { Prisma } from '@prisma/client'

export async function insertUser(user: Prisma.usersCreateInput) {
  return await prisma.users.create({
    data: user,
  })
}
