import type { Prisma, contractType, experienceLevel, remoteType } from '@prisma/client'
import consola from 'consola'

export async function getProcesses({
  contractTypes,
  experienceLevels,
  filters,
  locationId,
  pagination,
  remoteTypes,
  search,
  tagIds,
}: {
  filters?: Prisma.processesWhereInput
  pagination?: {
    direction: 'asc' | 'desc'
    orderBy: 'updatedAt' | 'createdAt'
    page: number
    pageSize: number
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

  const where: Prisma.processesWhereInput = {
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
    locations: locationId
      ? {
          some: {
            id: locationId,
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
    ...filters,
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
