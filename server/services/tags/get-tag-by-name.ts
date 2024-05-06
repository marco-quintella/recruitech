import { eq } from 'drizzle-orm'

export async function getTagByName(name: string) {
  const query = await db.select().from(tags)
    .where(eq(tags.name, name))
    .limit(1)
  return query?.[0]
}
