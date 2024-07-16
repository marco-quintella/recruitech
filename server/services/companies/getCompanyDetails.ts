export async function getCompanyDetails(id: string) {
  const company = await prisma.companies.findFirst({
    select: {
      companySize: true,
      facebook: true,
      id: true,
      instagram: true,
      linkedin: true,
      location: {
        select: {
          city: true,
          country: true,
          id: true,
          state: true,
        },
      },
      logo: true,
      name: true,
      processes: {
        include: {
          locations: true,
        },
      },
      short_description: true,
      twitter: true,
      website: true,
    },
    where: { id },
  })

  return {
    ...company,
    availableLocations: new Set(company?.processes.map(process => process.locations)).values(),
    processesTypes: new Set(company?.processes.map(process => process.contractType)).values(),
  }
}
