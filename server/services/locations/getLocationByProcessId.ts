import { eq } from 'drizzle-orm'

export async function getLocationByProcessId(id: string) {
  const relationshipQuery = await db.select()
    .from(processesToLocations)
    .where(eq(processesToLocations.processId, id))
    .limit(1)
  const locationId = relationshipQuery?.[0]?.locationId

  if (!locationId)
    return

  const query = await db.select()
    .from(locations)
    .where(eq(locations.id, locationId))
    .limit(1)

  return query?.[0]
}
