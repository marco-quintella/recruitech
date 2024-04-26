import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const {
    companyId,
    direction = 'asc',
    orderBy = 'name',
    page = 1,
    pageSize = 10,
  } = await validateQuery<{
    orderBy?: 'name' | 'email' | 'role'
    direction?: 'asc' | 'desc'
    page?: number
    pageSize?: number
    companyId: string
  }>(event, z.object({
    companyId: z.string().trim().uuid(),
    direction: z.enum(['asc', 'desc']).optional(),
    orderBy: z.enum(['name', 'email', 'role']).optional(),
    page: numberSchema.optional(),
    pageSize: numberSchema.optional(),
  }))

  const { data: userSession } = await requireAuthSession(event)
  validateIsCompanyMember(userSession, companyId)

  return await getUserByCompanyId(companyId, {
    direction,
    orderBy,
    page,
    pageSize,
  })
})
