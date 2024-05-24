export async function createLocation(location: {
  city?: string
  country?: string
  state?: string
}) {
  const query = await db.insert(locations)
    .values({
      city: location.city,
      country: location.country ?? 'BR',
      state: location.state,
    })
    .returning()
  return query?.[0]
}
