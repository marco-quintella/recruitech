export async function getJobTitles() {
  const query = await db.select()
    .from(jobTitles)
    .orderBy(jobTitles.name)
  return query
}
