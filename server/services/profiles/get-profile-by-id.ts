export async function getProfileById(id: string) {
  return await prisma.profiles.findFirst({
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      id,
    },
  })
}
