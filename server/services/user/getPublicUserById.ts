export async function getPublicUserById(id: string) {
  return await prisma.users.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: {
      id,
    },
  })
}
