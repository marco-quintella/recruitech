import { eq } from 'drizzle-orm'

export async function updateUser(id: string, data: UserInsert) {
  const query = await db.update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning()
  return query?.[0]
}
