export async function getProfileByUserId(userId: string) {
  return await prisma.profiles.findFirst({
    include: {
      jobTitles: {
        select: {
          id: true,
          name: true,
        },
      },
      location: {
        select: {
          city: true,
          country: true,
          id: true,
          state: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
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
