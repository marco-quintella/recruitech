import type { Prisma } from '@prisma/client'

export async function createLocation(data: Prisma.locationsCreateArgs['data']) {
  return await prisma.locations.create({
    data,
  })
}
