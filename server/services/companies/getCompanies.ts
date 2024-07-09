export async function getCompanies({
  filters,
  pagination,
  search,
}: {
  filters?: Partial<Company>
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
  search?: string
} = {}) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const [total, companies] = await prisma.$transaction([
    prisma.companies.count({
      where: {
        id: filters?.id,
        name: {
          contains: `%${search}%`,
        },
      },
    }),
    prisma.companies.findMany({
      orderBy: {
        [orderBy]: direction,
      },
      select: {
        companySize: true,
        facebook: true,
        hqLocation: true,
        id: true,
        instagram: true,
        linkedin: true,
        location: true,
        logo: true,
        name: true,
        processes: {
          where: {
            cancelledAt: null,
            finishedAt: null,
          },
        },
        short_description: true,
        website: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        id: filters?.id,
        name: {
          contains: `%${search}%`,
        },
      },
    }),
  ])

  return {
    data: companies,
    meta: {
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
  }
}
