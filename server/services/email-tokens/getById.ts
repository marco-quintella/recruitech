export async function getOneEmailTokenById(id: string) {
  return await prisma.emailTokens.findFirst({
    include: {
      user: {
        select: {
          company: true,
          confirmedEmail: true,
          email: true,
          id: true,
          invitePending: true,
          name: true,
          role: true,
        },
      },
    },
    where: {
      id,
    },
  })
}
