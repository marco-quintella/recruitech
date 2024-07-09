export async function getCandidates({
  pagination,
}: {
  search?: string
  pagination?: {
    page?: number
    pageSize?: number
  }
}) {
  const { page = 1, pageSize = 10 } = pagination ?? {}

  const query = await prisma.$transaction([
    prisma.profiles.count(),
    prisma.profiles.findMany({
      select: {
        createdAt: true,
        cv: true,
        id: true,
        jobTitles: {
          select: {
            id: true,
            name: true,
          },
        },
        locationId: false,
        locations: true,
        presentation: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        userId: false,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  const [total, profiles] = query

  return {
    data: profiles,
    meta: {
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
  }
}
