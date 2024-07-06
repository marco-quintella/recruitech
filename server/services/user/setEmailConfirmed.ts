import { eq } from 'drizzle-orm'

export function setEmailConfirmed(userId: string) {
  return db.update(users)
    .set({ confirmedEmail: true })
    .where(eq(users.id, userId))
}
