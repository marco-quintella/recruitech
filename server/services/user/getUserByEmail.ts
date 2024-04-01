import { eq } from 'drizzle-orm'

export async function getUserByEmail(email: string) {
  const query = await db.select().from(users).where(eq(users.email, email)).limit(1)
  return query?.[0]
}
