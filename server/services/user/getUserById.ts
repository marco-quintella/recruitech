import { eq } from 'drizzle-orm'

export async function getUserById(id: string) {
  const query = await db.select({ id: users.id })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
  return query?.[0]
}
