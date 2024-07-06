import { and, eq } from 'drizzle-orm'

export async function deleteFavorite({
  candidateId,
  processId,
  userId,
}: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  const query = db.delete(favorites)

  if (!candidateId && !processId)
    throw createError({ message: 'Id do candidato ou do processo é necessário.', statusCode: 400 })

  if (candidateId)
    query.where(and(eq(favorites.userId, userId), eq(favorites.candidateId, candidateId)))
  else if (processId)
    query.where(and(eq(favorites.userId, userId), eq(favorites.processId, processId)))

  await query
}
