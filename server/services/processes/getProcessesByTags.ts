export async function getProcessesByTags(tags: string[]) {
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
    where: {
      cancelledAt: null,
      finishedAt: null,
    },
  })
}
