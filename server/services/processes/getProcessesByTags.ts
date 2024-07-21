export async function getProcessesByTags(tags: string[], {
  pageSize,
  sortBy,
}: {
  sortBy?: 'createdAt'
  pageSize?: number
} = {}) {
  if (tags.length === 0)
    return

  return await prisma.processes.findMany({
    include: {
      tags: {
        where: {
          id: {
            in: tags,
          },
        },
      },
    },
    orderBy: sortBy
      ? {
          [sortBy]: 'desc',
        }
      : undefined,
    take: pageSize,
    where: {
      cancelledAt: null,
      finishedAt: null,
    },
  })
}
