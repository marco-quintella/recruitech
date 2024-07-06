export async function insertProcess(
  value: ProcessInsert,
  relations?: {
    tags?: string[]
    jobTitles?: string[]
    location?: {
      city?: string
      country?: string
      state?: string
    }
  },
) {
  const validTags: string[] = []
  if (relations?.tags) {
    const tagPromises = relations.tags.map(tagId => getTagById(tagId))
    const tags = await Promise.all(tagPromises)
    validTags.push(...tags.filter(Boolean).map(tag => tag!.id))
  }

  const validJobTitles: string[] = []
  if (relations?.jobTitles) {
    const jobTitlePromises = relations.jobTitles.map(jobTitleId => getJobTitleById(jobTitleId))
    const jobTitles = await Promise.all(jobTitlePromises)
    validJobTitles.push(...jobTitles.filter(Boolean).map(jobTitle => jobTitle!.id))
  }

  // Add Location
  const locationEntry = await createLocation({
    city: relations?.location?.city,
    country: 'BR',
    state: relations?.location?.state,
  })

  const query = await db.insert(processes)
    .values(value)
    .returning()

  if (validTags.length) {
    await db.insert(processesToTags)
      .values(validTags.map(tagId => ({
        processId: query[0].id,
        tagId,
      })))
  }

  if (validJobTitles.length) {
    await db.insert(processesToJobTitles)
      .values(validJobTitles.map(jobTitleId => ({
        jobTitleId,
        processId: query[0].id,
      })))
  }

  if (locationEntry) {
    await db.insert(processesToLocations)
      .values({
        locationId: locationEntry.id,
        processId: query[0].id,
      })
  }

  return query[0]
}
