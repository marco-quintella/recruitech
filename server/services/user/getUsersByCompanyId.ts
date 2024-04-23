import { asc, count, desc, eq } from 'drizzle-orm'

export async function getUserByCompanyId(companyId: string, opts?: {
  page?: number
  pageSize?: number
  orderBy?: 'name' | 'email' | 'role'
  direction?: 'asc' | 'desc'
}) {
  const { direction = 'asc', orderBy = 'name', page = 1, pageSize = 10 } = opts || {}

  const query = await db.select({
    companyId: users.companyId,
    email: users.email,
    id: users.id,
    name: users.name,
    role: users.role,
  })
    .from(users)
    .where(eq(users.companyId, companyId))
    .orderBy(direction === 'asc' ? asc(users[orderBy]) : desc(users[orderBy]))
    .offset((page - 1) * pageSize)
    .limit(pageSize)

  const total = await db.select({ count: count() })
    .from(users)
    .where(eq(users.companyId, companyId))

  return {
    data: query,
    meta: {
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / pageSize),
      },
    },
  }
}
