export async function getDiscards({
  candidateId,
  processId,
  userId,
}: {
  processId?: string
  candidateId?: string
  userId: string
}) {
  return await prisma.discards.findMany({
    where: {
      candidateId,
      processId,
      userId,
    },
  })
}
