import { z } from 'zod'
import type { ContractType } from '../../../db/contract-type'
import { contractTypeSchema } from '../../../db/contract-type'

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
  contractTypes?: ContractType | ContractType[]
}

export type GetProcessesResponse = Awaited<ReturnType<typeof getProcesses>>

export default defineCachedEventHandler(async (event) => {
  const {
    companyId,
    contractTypes,
    direction = 'desc',
    id,
    locationId,
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
    search,
    tags,
  } = await validateQuery<GetProcessesQuery>(event, z.object({
    companyId: z.string().uuid().nullish().or(z.string().max(0)),
    contractTypes: z.array(contractTypeSchema).nullish().or(contractTypeSchema),
    direction: z.enum(['asc', 'desc']).nullish(),
    id: z.string().trim().uuid().nullish(),
    locationId: z.string().trim().nullish().or(z.string().max(0)),
    orderBy: z.enum(['updatedAt', 'createdAt']).nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    search: z.string().trim().nullish().or(z.string().max(0)),
    tags: z.array(z.string().trim().uuid()).nullish().or(z.string().trim().uuid()),
  }))

  return await getProcesses({
    contractTypes: Array.isArray(contractTypes) ? contractTypes : undefined,
    filters: {
      companyId,
      contractType: !Array.isArray(contractTypes) ? contractTypes : undefined,
      id,
    },
    locationId,
    pagination: {
      direction,
      orderBy,
      page,
      pageSize,
    },
    search,
    tagIds: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
  })
}, {
  base: 'redis',
  maxAge: 5,
})
