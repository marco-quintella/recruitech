import { z } from 'zod'

type GetProcessesQuery = QueryObject & {
  orderBy?: 'updatedAt' | 'createdAt'
  direction?: 'asc' | 'desc'
  page?: number
  pageSize?: number
  companyId?: string
  id?: string
}

export default defineEventHandler(async (event) => {
  const {
    companyId,
    direction = 'desc',
    id,
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
  } = await validateQuery<GetProcessesQuery>(event, z.object({
    companyId: z.string().uuid().optional(),
    direction: z.enum(['asc', 'desc']).optional(),
    id: z.string().uuid().optional(),
    orderBy: z.enum(['updatedAt', 'createdAt']).optional(),
    page: numberSchema.optional(),
    pageSize: numberSchema.optional(),
  }))

  return await getProcesses({
    companyId,
    id,
  }, {
    direction,
    orderBy,
    page,
    pageSize,
  })
})