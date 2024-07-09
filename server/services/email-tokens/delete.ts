export async function deleteEmailToken(id: string) {
  return await prisma.emailTokens.delete({
    where: { id },
  })
}
