import type { Prisma } from '@prisma/client'
import { asc, count, desc, eq, ilike, inArray } from 'drizzle-orm'
import type { ContractType } from '~/db/contract-type'
import type { ExperienceLevel } from '~/db/experience-level'

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
  contractTypes?: ContractType[]
  experienceLevels?: ExperienceLevel[]
  remoteTypes?: RemoteType[]
},
) {
  const { direction = 'desc', orderBy = 'updatedAt', page = 1, pageSize = 10 } = pagination ?? {}

  const where: Prisma.processesWhereInput = {
    company: {
      name: {
        contains: `%${search}%`,
      },
    },
    contractType: {
      in: contractTypes,
    },
    experienceLevel: {
      in: experienceLevels,
    },
    locations: {
      some: {
        id: locationId,
      },
    },
    remote: {
      in: remoteTypes,
    },
    tags: {
      some: {
        id: {
          in: tagIds,
        },
      },
    },
    title: {
      contains: `%${search}%`,
    },
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
