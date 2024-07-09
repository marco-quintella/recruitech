import type { Location } from '~/db/locations'

export async function getCompanyDetails(id: string) {
  const company = await prisma.companies.findFirst({
    select: {
      location: {
        select: {
          city: true,
          country: true,
          id: true,
          state: true,
        },
      },
      processes: {
        include: {
          locations: true,
        },
      },
    },
    where: { id },
  })

  return {
    ...company,
    availableLocations: new Set(company?.processes.map(process => process.locations)).values(),
    processesTypes: new Set(company?.processes.map(process => process.contractType)).values(),
  }
}
