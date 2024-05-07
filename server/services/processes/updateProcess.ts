import { eq } from 'drizzle-orm'

export async function updateProcess(
  body: ProcessUpdate & { tags?: string[] },
) {
  const { companyId, id, tags, ...data } = body
  const validTags: string[] = []

  if (tags) {
    const tagPromises = tags.map(tagId => getTagById(tagId))
    const tagsData = await Promise.all(tagPromises)
    validTags.push(...tagsData.filter(Boolean).map(tag => tag!.id))
  }

  if (!id)
    return

  if (validTags.length) {
    await db.insert(processesToTags)
      .values(validTags.map(tagId => ({
        processId: id,
        tagId,
      })),
      ).onConflictDoNothing()
  }

  const query = await db.update(processes)
    .set({
      ...data,
      cancelledAt: data.cancelledAt ? new Date(data.cancelledAt) : undefined,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      finishedAt: data.finishedAt ? new Date(data.finishedAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    })
    .where(eq(processes.id, id))
    .returning()
  return query?.[0]
}
