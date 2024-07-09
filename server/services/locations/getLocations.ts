export type GetLocationsResponse = Awaited<ReturnType<typeof getLocations>>

export async function getLocations({ search }: { search?: string }) {
  return await prisma.locations.findMany({
    orderBy: {
      city: 'asc',
      country: 'asc',
      state: 'asc',
    },
    select: {
      city: true,
      country: true,
      id: true,
      state: true,
    },
    take: 5,
    where: {
      OR: [
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
      ],
    },
  })
}
