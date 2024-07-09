export async function setEmailConfirmed(userId: string) {
  return await prisma.users.update({
    data: {
      confirmedEmail: true,
    },
    where: {
      id: userId,
    },
  })
}
