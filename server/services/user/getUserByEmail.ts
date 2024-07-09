export async function getUserByEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  })
}
