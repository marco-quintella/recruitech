import { eq } from 'drizzle-orm'

export async function getOneEmailTokenById(id: string) {
  const query = await db.select()
    .from(emailTokens)
    .where(eq(emailTokens.id, id))
    .leftJoin(users, eq(emailTokens.userId, users.id))
    .limit(1)
  return query?.[0]
}
