export async function insertTag(value: TagInsert) {
  const query = await db.insert(tags)
    .values(value)
    .returning()
  return query?.[0]
}
