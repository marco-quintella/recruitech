import { z } from 'zod'

export default defineEventHandler<{
  query: {
    orderBy?: 'updatedAt'
    direction?: 'asc' | 'desc'
    page?: number
    pageSize?: number

    companyId?: string
  }
}>(async (event) => {
  const {
    companyId,
    direction = 'desc',
    orderBy = 'updatedAt',
    page = 1,
    pageSize = 10,
  } = await validateQuery(event, z.object({
    companyId: z.string().uuid().optional(),
    direction: z.enum(['asc', 'desc']).optional(),
    orderBy: z.enum(['updatedAt']).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }))

  return await getProcesses({
    companyId,
  }, {
    direction,
    orderBy,
    page,
    pageSize,
  })
})
