import { eq } from 'drizzle-orm'
import type { UpdateCompanyBody } from '~/server/api/companies/index.patch'

export async function updateCompany(body: UpdateCompanyBody) {
  const { id, location, ...data } = body
  let locationData

  if (location?.city || location?.state || location?.country)
    locationData = await upsertLocation(location)

  const query = await db.update(companies)
    .set({ ...data, hqLocation: locationData?.id })
    .where(eq(companies.id, id))
    .returning()

  return { ...query?.[0], location: locationData }
}
