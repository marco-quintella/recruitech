import { ilike } from 'drizzle-orm'

export async function getJobTitlesByName(name: string) {
  const query = db.select()
    .from(jobTitles)
    .where(ilike(jobTitles.name, `%${name}%`))
    .orderBy(jobTitles.name)

  return query
}
