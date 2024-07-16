export async function getCompanyById(id: string) {
  return await prisma.companies.findFirst({
    where: {
      id,
    },
  })
}
