export async function createUserInvite(email: string, role: Role, companyId: string) {
  return await prisma.users.create({
    data: {
      companyId,
      email,
      invitePending: true,
      name: email,
      password: await hash(email + Date.now().toString()),
      role,
    },
  })
}
