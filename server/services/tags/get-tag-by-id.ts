import { eq } from 'drizzle-orm'

export async function getTagById(id: string) {
  const query = await db.select().from(tags)
    .where(eq(tags.id, id))
    .limit(1)
  return query?.[0]
}
