import { eq } from 'drizzle-orm'

export async function updateProcess(body: ProcessUpdate) {
  const { companyId, id, ...data } = body
  if (!id)
    return
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
