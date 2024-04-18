import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const companyId = validateRouteParam(event, 'id', z.string().trim().uuid())

  const { data: userSession } = await requireAuthSession(event)
  validateIsCompanyMember(userSession, companyId)

  const users = await getUserByCompanyId(companyId)

  return {
    data: users.data,
    meta: {
      pagination: {
        total: users.total,
      },
    },
  }
})
