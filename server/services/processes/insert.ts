import type { Prisma } from '@prisma/client'

export async function insertProcess(
  data: Prisma.processesCreateArgs['data'],
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

  return await prisma.processes.create({
    data: {
      ...data,
      jobTitles: {
        connect: validJobTitles.map(jobTitleId => ({ id: jobTitleId })),
      },
      locations: {
        connect: locationEntry ? [{ id: locationEntry.id }] : [],
      },
      tags: {
        connect: validTags.map(tagId => ({ id: tagId })),
      },
    },
  })
}
