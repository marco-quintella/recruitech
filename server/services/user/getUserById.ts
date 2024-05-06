import { eq } from 'drizzle-orm'

export async function getPrivateUserById(id: string) {
  const query = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    role: users.role,
    companyId: users.companyId,
    invitePending: users.invitePending,
    confirmedEmail: users.confirmedEmail,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
  return query?.[0]
}
