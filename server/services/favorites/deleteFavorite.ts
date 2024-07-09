export async function deleteFavorite({
  candidateId,
  processId,
  userId,
}: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  if (!candidateId && !processId)
    throw createError({ message: 'Id do candidato ou do processo é necessário.', statusCode: 400 })

  if (candidateId) {
    return await prisma.favorites.deleteMany({
      where: {
        candidateId,
        userId,
      },
    })
  }
  else if (processId) {
    return await prisma.favorites.deleteMany({
      where: {
        processId,
        userId,
      },
    })
  }
}
