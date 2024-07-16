export const getCandidateById = defineCachedFunction(async (id: string) => {
  return await prisma.profiles.findFirstOrThrow({
    select: {
      createdAt: true,
      cv: true,
      id: true,
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
      presentation: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      updatedAt: true,
      user: {
        select: {
          email: true,
          id: true,
          name: true,
        },
      },
    },
    where: {
      id,
    },
  })
})
