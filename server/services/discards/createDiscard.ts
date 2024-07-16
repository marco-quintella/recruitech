export async function createDiscard({ candidateId, processId, userId }: {
  userId: string
  candidateId?: string
  processId?: string
}) {
  return await prisma.discards.create({
    data: {
      candidate: candidateId
        ? {
            connect: {
              id: candidateId,
            },
          }
        : undefined,
      processes: processId
        ? {
            connect: {
              id: processId,
            },
          }
        : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}
