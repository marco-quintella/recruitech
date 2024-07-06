import type { Location } from '~/db/locations'

export async function getCompanyDetails(id: string) {
  const company = await db.query.companies.findFirst({
    where: (companies, { eq }) => eq(companies.id, id),
    with: {
      locations: true,
      processes: {
        with: {
          processesToLocations: {
            with: {
              location: true,
            },
          },
        },
      },
    },
  })

  const data: typeof company & {
    processesTypes?: ContractType[]
    availableLocations?: Location[]
  } | undefined = company

  if (data) {
    data.processes.forEach((process) => {
      if (!data.processesTypes)
        data.processesTypes = []
      if (!data.processesTypes.includes(process.contractType))
        data.processesTypes?.push(process.contractType)

      if (!data.availableLocations)
        data.availableLocations = []

      process.processesToLocations.forEach((processToLocation) => {
        if (!data.availableLocations?.some(location => location.id === processToLocation.location.id))
          data.availableLocations?.push(processToLocation.location)
      })
    })
  }
  return data
}
