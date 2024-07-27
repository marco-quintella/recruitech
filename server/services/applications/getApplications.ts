import type { Prisma } from '@prisma/client'

export const getApplications = defineCachedFunction(async ({ filters, pagination }: {
  filters?: {
    companyId?: string | null
    discard?: boolean
    favorite?: boolean
    location?: {
      city?: string
      country?: string
      state?: string
    }
    processId?: string
    profileId?: string
    requestingUserId?: string
    userId?: string
  }
  pagination?: {
    direction?: 'asc' | 'desc'
    orderBy?: keyof Prisma.applicationsOrderByWithRelationInput | 'userName' | 'processTitle'
    page?: number
    pageSize?: number
  }
}) {
  const { direction = 'desc', orderBy = 'createdAt', page = 1, pageSize = 10 } = pagination ?? {}

  const where: Prisma.applicationsWhereInput = {
    process: filters?.companyId
      ? {
          companyId: filters.companyId,
        }
      : undefined,
    processId: filters?.processId,
    profile: filters?.userId
    || ((filters?.discard || filters?.favorite) && filters?.requestingUserId)
    || filters?.location?.city || filters?.location?.country || filters?.location?.state
      ? {
          candidateDiscards: filters?.discard ? { some: { userId: filters.requestingUserId } } : undefined,
          candidateFavorites: filters?.favorite ? { some: { userId: filters.requestingUserId } } : undefined,
          location: filters?.location?.city || filters?.location?.country || filters?.location?.state
            ? {
                city: filters?.location?.city,
                country: filters?.location?.country,
                state: filters?.location?.state,
              }
            : undefined,
          userId: filters.userId,
        }
      : undefined,
    profileId: filters?.profileId,
  }

  const [total, applications] = await prisma.$transaction([
    prisma.applications.count({ where }),
    prisma.applications.findMany({
      include: {
        process: {
          select: {
            id: true,
            title: true,
          },
        },
        profile: {
          include: {
            _count: filters?.companyId
              ? {
                  select: {
                    candidateDiscards: {
                      where: {
                        userId: filters?.requestingUserId,
                      },
                    },
                    candidateFavorites: {
                      where: {
                        userId: filters?.requestingUserId,
                      },
                    },
                  },
                }
              : false,
            jobTitles: {
              select: {
                id: true,
                name: true,
              },
            },
            location: {
              select: {
                city: true,
                country: true,
                id: true,
                state: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
            user: {
              select: {
                email: true,
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: orderBy === 'userName'
        ? {
            profile: {
              user: {
                name: direction,
              },
            },
          }
        : orderBy === 'processTitle'
          ? {
              process: {
                title: direction,
              },
            }
          : {
              [orderBy]: direction,
            },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
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
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getApplications',
})
