import type { Prisma } from '@prisma/client'

export async function updateCompany(body: (Prisma.companiesUpdateInput & { id: string }) & {
  location?: Prisma.locationsCreateInput
}) {
  const { id, location, ...data } = body
  let locationData

  if (!id)
    throw new Error('Company ID is required')

  if (location?.city || location?.state || location?.country)
    locationData = await upsertLocation(location)

  return await prisma.companies.update({
    data: {
      ...data,
      hqLocation: locationData?.id,
    },
    include: {
      location: true,
    },
    where: { id },
  })
}
