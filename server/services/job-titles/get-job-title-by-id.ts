import { eq } from 'drizzle-orm'

export async function getJobTitleById(id: string) {
  const query = await db.select()
    .from(jobTitles)
    .where(eq(jobTitles.id, id))
    .limit(1)
  return query?.[0] || undefined
}
