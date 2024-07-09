export async function getFavorites({
  candidateId,
  processId,
  userId,
}: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  return await prisma.favorites.findMany({
    where: {
      candidateId,
      processId,
      userId,
    },
  })
}
