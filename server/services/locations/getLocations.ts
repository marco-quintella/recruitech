import { asc, ilike, or } from 'drizzle-orm'

export type GetLocationsResponse = Awaited<ReturnType<typeof getLocations>>

export async function getLocations({ search }: { search?: string }) {
  const query = db.select({
    city: locations.city,
    country: locations.country,
    id: locations.id,
    state: locations.state,
  })
    .from(locations)

  if (search) {
    query.where(
      or(
        ilike(locations.country, `%${search}%`),
        ilike(locations.state, `%${search}%`),
        ilike(locations.city, `%${search}%`),
      ),
    )
  }

  query.orderBy(
    asc(locations.country),
    asc(locations.state),
    asc(locations.city),
  )
    .limit(5)

  return await query
}
