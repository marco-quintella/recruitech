import { ilike } from 'drizzle-orm'

export async function getTagsByName(name: string) {
  const query = await db.select().from(tags)
    .where(ilike(tags.name, `%${name}%`))
    .orderBy(tags.name)
  return query
}
