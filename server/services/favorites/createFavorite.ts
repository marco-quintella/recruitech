export async function createFavorite(value: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  return await prisma.favorites.create({
    data: value,
  })
}
