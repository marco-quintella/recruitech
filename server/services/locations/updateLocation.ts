import { eq } from 'drizzle-orm'

export async function updateLocation(location: {
  id: string
  city?: string
  state?: string
}) {
  const query = await db.update(locations)
    .set({
      city: location.city,
      state: location.state,
    })
    .where(eq(locations.id, location.id))
    .returning()
  return query?.[0]
}
