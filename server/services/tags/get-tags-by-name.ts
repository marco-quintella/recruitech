export async function getTagsByName(name: string) {
  return await prisma.tags.findMany({
    where: {
      name: {
        contains: `%${name}%`,
      },
    },
  })
}
