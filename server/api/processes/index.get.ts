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
  country?: string
  state?: string
  city?: string
  locationId?: string
  tags?: string | string[]
  contractTypes?: contractType | contractType[]
  experienceLevels?: experienceLevel | experienceLevel[]
  remoteTypes?: remoteType | remoteType[]
  finished?: boolean
  cancelled?: boolean
}

export type GetProcessesResponse = Awaited<ReturnType<typeof getProcesses>>

export default defineCachedEventHandler(async (event) => {
  const {
    cancelled,
    city,
    companyId,
    contractTypes,
    country,
    direction = 'desc',
    experienceLevels,
    finished,
    id,
    locationId,
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
    remoteTypes,
    search,
    state,
    tags,
  } = await validateQuery<GetProcessesQuery>(event, z.object({
    cancelled: booleanSchema.nullish(),
    city: z.string().trim().nullish(),
    companyId: z.string().trim().uuid().nullish(),
    contractTypes: z.array(contractTypeSchema).nullish().or(contractTypeSchema),
    country: z.string().trim().nullish(),
    direction: z.enum(['asc', 'desc']).nullish(),
    experienceLevels: z.array(experienceLevelSchema).nullish().or(experienceLevelSchema),
    finished: booleanSchema.nullish(),
    id: z.string().trim().uuid().nullish(),
    locationId: z.string().trim().uuid().nullish(),
    orderBy: z.enum(['updatedAt', 'createdAt']).nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    remoteTypes: z.array(remoteTypeSchema).nullish().or(remoteTypeSchema),
    search: z.string().trim().nullish().or(z.string().max(0)),
    state: z.string().trim().nullish(),
    tags: z.array(z.string().trim().uuid()).nullish().or(z.string().trim().uuid()),
  }))

  return await getProcesses({
    contractTypes: Array.isArray(contractTypes) ? contractTypes : undefined,
    experienceLevels: Array.isArray(experienceLevels) ? experienceLevels : undefined,
    filters: {
      cancelled,
      companyId,
      contractType: !Array.isArray(contractTypes) ? contractTypes : undefined,
      experienceLevel: !Array.isArray(experienceLevels) ? experienceLevels : undefined,
      finished,
      id,
      remote: !Array.isArray(remoteTypes) ? remoteTypes : undefined,
    },
    location: {
      city,
      country,
      state,
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
