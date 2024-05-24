import { and, eq } from 'drizzle-orm'

export async function getFavorites({
  candidateId,
  processId,
  userId,
}: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  const query = db.select()
    .from(favorites)

  if (candidateId && processId)
    query.where(and(eq(favorites.userId, userId), eq(favorites.candidateId, candidateId), eq(favorites.processId, processId)))
  else if (candidateId)
    query.where(and(eq(favorites.userId, userId), eq(favorites.candidateId, candidateId)))
  else if (processId)
    query.where(and(eq(favorites.userId, userId), eq(favorites.processId, processId)))

  return await query
}
