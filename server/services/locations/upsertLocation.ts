import { eq, isNull } from 'drizzle-orm'

export async function upsertLocation(location: {
  city?: string | null
  country?: string | null
  state?: string | null
}) {
  const query = db.select({ id: locations.id })
    .from(locations).$dynamic()

  if (location.city)
    query.where(eq(locations.city, location.city))
  else
    query.where(isNull(locations.city))

  if (location.state)
    query.where(eq(locations.state, location.state))
  else
    query.where(isNull(locations.state))

  if (location.country)
    query.where(eq(locations.country, location.country))
  else
    query.where(isNull(locations.country))

  const ids = await query
  const id = ids?.[0]?.id

  if (!id) {
    const query = await db.insert(locations)
      .values({
        city: location.city,
        country: location.country ?? 'BR',
        state: location.state,
      })
      .returning()
    return query?.[0]
  }
  else {
    const query = await db.update(locations)
      .set({
        city: location.city,
        country: location.country ?? 'BR',
        state: location.state,
      })
      .where(eq(locations.id, id))
      .returning()
    return query?.[0]
  }
}
