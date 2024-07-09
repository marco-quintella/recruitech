export async function getPrivateUserById(id: string) {
  return await prisma.users.findFirst({
    select: {
      companyId: true,
      confirmedEmail: true,
      createdAt: true,
      email: true,
      id: true,
      invitePending: true,
      name: true,
      role: true,
      updatedAt: true,
    },
    where: {
      id,
    },
  })
}
