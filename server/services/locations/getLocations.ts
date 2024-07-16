export type GetLocationsResponse = Awaited<ReturnType<typeof getLocations>>

export async function getLocations({ search }: { search?: string }) {
  return await prisma.locations.findMany({
    orderBy: [
      {
        country: 'asc',
      },
      {
        state: 'asc',
      },
      {
        city: 'asc',
      },
    ],
    select: {
      city: true,
      country: true,
      id: true,
      state: true,
    },
    take: 5,
    where: {
      OR: search
        ? [
            {
              country: {
                contains: `%${search}%`,
              },
            },
            {
              state: {
                contains: `%${search}%`,
              },
            },
            {
              city: {
                contains: `%${search}%`,
              },
            },
          ]
        : undefined,
    },
  })
}
