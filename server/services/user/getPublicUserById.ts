import { eq } from 'drizzle-orm'

export async function getPublicUserById(id: string) {
  const query = await db.select({
    id: users.id,
    name: users.name,
  })
    .from(users)
    .where(eq(users.id, id))

  return query?.[0]
}
