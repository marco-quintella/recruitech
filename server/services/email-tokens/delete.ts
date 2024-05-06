import { eq } from 'drizzle-orm'

export function deleteEmailToken(id: string) {
  return db.delete(emailTokens).where(eq(emailTokens.id, id))
}
