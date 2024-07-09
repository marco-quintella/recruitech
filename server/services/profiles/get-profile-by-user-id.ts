export async function getProfileByUserId(userId: string) {
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
      userId,
    },
  })
}
