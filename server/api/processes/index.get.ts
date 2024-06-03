import { z } from 'zod'

export type GetProcessesQuery = QueryObject & {
  orderBy?: 'updatedAt' | 'createdAt'
  direction?: 'asc' | 'desc'
  page?: number
  pageSize?: number
  companyId?: string
  id?: string
  search?: string
}

export type GetProcessesResponse = Awaited<ReturnType<typeof getProcesses>>

export default defineCachedEventHandler(async (event) => {
  const {
    companyId,
    direction = 'desc',
    id,
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
    search,
  } = await validateQuery<GetProcessesQuery>(event, z.object({
    companyId: z.string().uuid().optional(),
    direction: z.enum(['asc', 'desc']).optional(),
    id: z.string().uuid().optional(),
    orderBy: z.enum(['updatedAt', 'createdAt']).optional(),
    page: numberSchema.optional(),
    pageSize: numberSchema.optional(),
    search: z.string().trim().optional(),
  }))

  return await getProcesses({
    filters: {
      companyId,
      id,
    },
    pagination: {
      direction,
      orderBy,
      page,
      pageSize,
    },
    search,
  })
}, {
  base: 'redis',
  maxAge: 15,
})
