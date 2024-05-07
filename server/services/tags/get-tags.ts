export async function getTags() {
  const query = await db.select().from(tags).orderBy(tags.name)
  return query
}
