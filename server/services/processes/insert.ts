export async function insertProcess(
  value: ProcessInsert,
  relations?: {
    tags?: string[]
  },
) {
  const validTags: string[] = []
  if (relations?.tags) {
    const tagPromises = relations.tags.map(tagId => getTagById(tagId))
    const tags = await Promise.all(tagPromises)
    validTags.push(...tags.filter(Boolean).map(tag => tag!.id))
  }

  const query = await db.insert(processes)
    .values(value)
    .returning()

  if (validTags.length) {
    await db.insert(processesToTags)
      .values(validTags.map(tagId => ({
        processId: query[0].id,
        tagId,
      })))
  }

  return query?.[0]
}
