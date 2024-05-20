import { eq } from 'drizzle-orm'

export async function getPrivateUserById(id: string) {
  const query = await db.select({
    companyId: users.companyId,
    confirmedEmail: users.confirmedEmail,
    createdAt: users.createdAt,
    email: users.email,
    id: users.id,
    invitePending: users.invitePending,
    name: users.name,
    role: users.role,
    updatedAt: users.updatedAt,
  })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
  return query?.[0]
}
