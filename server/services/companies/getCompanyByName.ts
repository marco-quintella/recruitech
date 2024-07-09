export async function getCompanyByName(name: string) {
  return await prisma.companies.findFirst({
    where: {
      name,
    },
  })
}
