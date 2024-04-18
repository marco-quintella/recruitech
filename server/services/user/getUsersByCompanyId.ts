import { count, eq } from 'drizzle-orm'

export async function getUserByCompanyId(companyId: string) {
  const query = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    companyId: users.companyId,
    role: users.role,
  })
    .from(users)
    .where(eq(users.companyId, companyId))

  const total = await db.select({ count: count() })
    .from(users)
    .where(eq(users.companyId, companyId))

  return {
    data: query,
    total: total[0].count,
  }
}
