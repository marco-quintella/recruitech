import type { Prisma, contractType, experienceLevel, remoteType } from '@prisma/client'

export async function getProcesses({
  contractTypes,
  experienceLevels,
  filters,
  location,
  locationId,
  pagination,
  remoteTypes,
  search,
  tagIds,
}: {
  filters?: Prisma.processesWhereInput & {
    finished?: boolean
    cancelled?: boolean
  }
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
  }
  location?: {
    country?: string
    city?: string
    state?: string
  }
  search?: string
  locationId?: string
  tagIds?: string[]
  contractTypes?: contractType[]
  experienceLevels?: experienceLevel[]
  remoteTypes?: remoteType[]
},
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}
  const { cancelled, finished, ...commonFilters } = filters ?? {}

  const where: Prisma.processesWhereInput = {
    cancelledAt: filters?.cancelled === true
      ? {
          not: null,
        }
      : filters?.cancelled === false ? null : undefined,
    company: search
      ? {
          name: {
            contains: `%${search}%`,
          },
        }
      : undefined,
    contractType: contractTypes?.length
      ? {
          in: contractTypes,
        }
      : undefined,
    experienceLevel: experienceLevels?.length
      ? {
          in: experienceLevels,
        }
      : undefined,
    finishedAt: filters?.finished === true
      ? {
          not: null,
        }
      : filters?.finished === false ? null : undefined,
    locations: locationId
      ? {
          some: {
            id: locationId,
          },
        }
      : location?.city || location?.country || location?.state
        ? {
            some: {
              city: location.city,
              country: location.country,
              state: location.state,
            },
          }
        : undefined,
    remote: remoteTypes?.length
      ? {
          in: remoteTypes,
        }
      : undefined,
    tags: tagIds?.length
      ? {
          some: {
            id: {
              in: tagIds,
            },
          },
        }
      : undefined,
    title: search
      ? {
          contains: `%${search}%`,
        }
      : undefined,
    ...commonFilters,
  }

  const [total, processes] = await prisma.$transaction([
    prisma.processes.count({
      where,
    }),
    prisma.processes.findMany({
      include: {
        company: true,
        jobTitles: true,
        locations: true,
        tags: true,
      },
      orderBy: {
        [orderBy]: direction,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
    }),
  ])

  // O(3n) return
  return {
    data: processes,
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
