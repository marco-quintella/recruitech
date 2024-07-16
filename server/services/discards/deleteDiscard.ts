export async function deleteDiscard({
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
    return await prisma.discards.deleteMany({
      where: {
        candidateId,
        userId,
      },
    })
  }
  else if (processId) {
    return await prisma.discards.deleteMany({
      where: {
        processId,
        userId,
      },
    })
  }
}
