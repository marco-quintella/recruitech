import { z } from 'zod'

export default defineEventHandler<{
  query: {
    orderBy?: 'name' | 'email' | 'role'
    direction?: 'asc' | 'desc'
    page?: number
    pageSize?: number
  }
}>(async (event) => {
  const companyId = validateRouteParam(event, 'id', z.string().trim().uuid())
  const {
    direction = 'asc',
    orderBy = 'name',
    page = 1,
    pageSize = 10,
  } = await validateQuery(event, z.object({
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
