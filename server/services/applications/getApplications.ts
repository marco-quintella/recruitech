export async function getApplications({ filters, pagination }: {
  filters?: {
    processId?: string
    profileId?: string
    companyId?: string | null
    userId?: string
  }
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
}) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const [total, applications] = await prisma.$transaction([
    prisma.applications.count({
      where: {
        processes: filters?.companyId
          ? {
              companyId: filters.companyId,
            }
          : undefined,
        processId: filters?.processId,
        profileId: filters?.profileId,
        profiles: filters?.userId
          ? {
              userId: filters.userId,
            }
          : undefined,
      },
    }),
    prisma.applications.findMany({
      orderBy: {
        [orderBy]: direction,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        processId: filters?.processId,
        profileId: filters?.profileId,
      },
    }),
  ])

  return {
    data: applications,
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
