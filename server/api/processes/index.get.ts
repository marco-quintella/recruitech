import type { contractType, experienceLevel, remoteType } from '@prisma/client'
import { z } from 'zod'

export type GetProcessesQuery = QueryObject & {
  orderBy?: 'updatedAt' | 'createdAt'
  direction?: 'asc' | 'desc'
  page?: number
  pageSize?: number
  companyId?: string
  id?: string
  search?: string
  locationId?: string
  tags?: string | string[]
  contractTypes?: contractType | contractType[]
  experienceLevels?: experienceLevel | experienceLevel[]
  remoteTypes?: remoteType | remoteType[]
}

export type GetProcessesResponse = Awaited<ReturnType<typeof getProcesses>>

export default defineCachedEventHandler(async (event) => {
  const {
    companyId,
    contractTypes,
    direction = 'desc',
    experienceLevels,
    id,
    locationId,
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
    remoteTypes,
    search,
    tags,
  } = await validateQuery<GetProcessesQuery>(event, z.object({
    companyId: z.string().uuid().nullish().or(z.string().max(0)),
    contractTypes: z.array(contractTypeSchema).nullish().or(contractTypeSchema),
    direction: z.enum(['asc', 'desc']).nullish(),
    experienceLevels: z.array(experienceLevelSchema).nullish().or(experienceLevelSchema),
    id: z.string().trim().uuid().nullish(),
    locationId: z.string().trim().nullish().or(z.string().max(0)),
    orderBy: z.enum(['updatedAt', 'createdAt']).nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    remoteTypes: z.array(remoteTypeSchema).nullish().or(remoteTypeSchema),
    search: z.string().trim().nullish().or(z.string().max(0)),
    tags: z.array(z.string().trim().uuid()).nullish().or(z.string().trim().uuid()),
  }))

  return await getProcesses({
    contractTypes: Array.isArray(contractTypes) ? contractTypes : undefined,
    experienceLevels: Array.isArray(experienceLevels) ? experienceLevels : undefined,
    filters: {
      companyId,
      contractType: !Array.isArray(contractTypes) ? contractTypes : undefined,
      experienceLevel: !Array.isArray(experienceLevels) ? experienceLevels : undefined,
      id,
      remote: !Array.isArray(remoteTypes) ? remoteTypes : undefined,
    },
    locationId,
    pagination: {
      direction,
      orderBy,
      page,
      pageSize,
    },
    remoteTypes: Array.isArray(remoteTypes) ? remoteTypes : undefined,
    search,
    tagIds: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
  })
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getProcesses',
})
