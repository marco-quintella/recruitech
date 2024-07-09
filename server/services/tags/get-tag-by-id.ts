export async function getTagById(id: string) {
  return await prisma.tags.findFirst({
    where: {
      id,
    },
  })
}
