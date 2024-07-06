import { and, eq, inArray, isNull } from 'drizzle-orm'

export async function getProcessesByTags(tags: string[]) {
  if (tags.length === 0)
    return

  const query = await db.select({
    processId: processes.id,
    tagId: processesToTags.tagId,
  })
    .from(processesToTags)
    .leftJoin(processes, eq(processes.id, processesToTags.processId))
    .where(
      and(
        inArray(processesToTags.tagId, tags),
        isNull(processes.finishedAt),
        isNull(processes.cancelledAt),
      ),
    )

  if (query.length === 0)
    return

  const tagsMap = query.reduce((acc: Record<string, string[]>, curr) => {
    if (!curr.processId)
      return acc
    if (!acc[curr.processId])
      acc[curr.processId] = []
    acc[curr.processId].push(curr.tagId)
    return acc
  }, {})

  return tagsMap
}
