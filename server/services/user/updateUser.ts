import type { Prisma } from '@prisma/client'

export async function updateUser(id: string, data: Prisma.usersUpdateInput) {
  return await prisma.users.update({
    data,
    select: {
      email: true,
      id: true,
      name: true,
      role: true,
    },
    where: {
      id,
    },
  })
}
