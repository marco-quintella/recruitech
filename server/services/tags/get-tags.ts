export type GetTagsResponse = Awaited<ReturnType<typeof getTags>>

export async function getTags({ search }: { search?: string }) {
  return await prisma.tags.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      name: {
        contains: search ? `%${search}%` : undefined,
      },
    },
  })
}
