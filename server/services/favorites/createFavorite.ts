export async function createFavorite(value: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  const query = await db.insert(favorites)
    .values(value)
    .returning()
  return query?.[0]
}
