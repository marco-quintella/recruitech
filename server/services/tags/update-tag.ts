import { eq } from 'drizzle-orm'

export async function updateTag(
  id: string,
  data: { name: string },
) {
  const query = await db.update(tags)
    .set({
      name: data.name,
      updatedAt: new Date(),
    })
    .where(eq(tags.id, id))
    .returning()
  return query?.[0]
}
