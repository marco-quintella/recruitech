export async function updateTag(
  id: string,
  data: { name: string },
) {
  return await prisma.tags.update({
    data,
    where: {
      id,
    },
  })
}
