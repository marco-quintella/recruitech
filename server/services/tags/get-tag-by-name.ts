export async function getTagByName(name: string) {
  return await prisma.tags.findFirst({
    where: {
      name,
    },
  })
}
