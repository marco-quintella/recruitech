import type { Prisma } from '@prisma/client'

interface GetCandidatesQuery {
  filters?: {
    location?: string
  }
  search?: string
  pagination?: {
    page?: number
    pageSize?: number
  }
}

export const getCandidates = defineCachedFunction(async ({
  filters,
  pagination,
  search,
}: GetCandidatesQuery) => {
  const { page = 1, pageSize = 10 } = pagination ?? {}

  const ORs: Prisma.profilesWhereInput[] = []

  if (search) {
    ORs.push({
      user: {
        name: {
          contains: search ? `%${search}%` : undefined,
          mode: 'insensitive',
        },
      },
    }, {
      jobTitles: {
        some: {
          name: {
            contains: search ? `%${search}%` : undefined,
            mode: 'insensitive',
          },
        },
      },
    }, {
      location: {
        OR: [
          {
            city: {
              contains: search ? `%${search}%` : undefined,
              mode: 'insensitive',
            },
          },
          {
            country: {
              contains: search ? `%${search}%` : undefined,
              mode: 'insensitive',
            },
          },
          {
            state: {
              contains: search ? `%${search}%` : undefined,
              mode: 'insensitive',
            },
          },
        ],
      },
    }, {
      presentation: {
        contains: search ? `%${search}%` : undefined,
        mode: 'insensitive',
      },
    }, {
      tags: {
        some: {
          name: {
            contains: search ? `%${search}%` : undefined,
            mode: 'insensitive',
          },
        },
      },
    })
  }

  const where: Prisma.profilesWhereInput = {
    location: {
      id: filters?.location,
    },
    OR: ORs.length ? ORs : undefined,
  }

  const query = await prisma.$transaction([
    prisma.profiles.count({ where }),
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
        location: true,
        locationId: false,
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
      where,
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
}, {
  base: 'redis',
  getKey: ({ filters, pagination, search }: GetCandidatesQuery) => `candidates:${filters?.location}:${pagination?.page}:${pagination?.pageSize}:${search}`,
  maxAge: 15,
})
