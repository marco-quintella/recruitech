import type { Prisma } from '@prisma/client'

export async function upsertLocation(location: Prisma.locationsCreateArgs['data']) {
  const query = await prisma.locations.findFirst({
    select: {
      id: true,
    },
    where: {
      city: location.city,
      country: location.country ?? 'BR',
      state: location.state,
    },
  })

  if (!query?.id) {
    return await prisma.locations.create({
      data: {
        city: location.city,
        country: location.country ?? 'BR',
        state: location.state,
      },
    })
  }
  return await prisma.locations.update({
    data: {
      city: location.city,
      country: location.country ?? 'BR',
      state: location.state,
    },
    where: { id: query.id },
  })
}
