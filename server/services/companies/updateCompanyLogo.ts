export async function updateCompanyLogo(id: string, url: string) {
  return await prisma.companies.update({
    data: {
      logo: url,
    },
    where: { id },
  })
}
