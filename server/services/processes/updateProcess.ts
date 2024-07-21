import type { Prisma } from '@prisma/client'

export async function updateProcess(
  body: Prisma.processesUpdateInput,
  relations: {
    tags?: string[]
    jobTitles?: string[]
    location?: Prisma.locationsCreateInput
  } | undefined = {},
) {
  const { company, id, ...data } = body
  const { jobTitles, location, tags } = relations

  if (!id)
    return

  const validTags: string[] = []
  if (tags) {
    const tagPromises = tags.map(tagId => getTagById(tagId))
    const tagsData = await Promise.all(tagPromises)
    validTags.push(...tagsData.filter(Boolean).map(tag => tag!.id))
  }

  const validJobTitles: string[] = []
  if (jobTitles) {
    const jobTitlePromises = jobTitles.map(jobTitleId => getJobTitleById(jobTitleId))
    const jobTitlesData = await Promise.all(jobTitlePromises)
    validJobTitles.push(...jobTitlesData.filter(Boolean).map(jobTitle => jobTitle!.id))
  }

  const locationEntry = await getLocationByProcessId(id.toString())

  return await prisma.processes.update({
    data: {
      ...data,
      company: {
        connect: {
          id: company?.toString(),
        },
      },
      jobTitles: {
        connect: validJobTitles.map(jobTitleId => ({ id: jobTitleId })),
      },
      locations: {
        upsert: {
          create: {
            city: location?.city,
            country: 'BR',
            state: location?.state,
          },
          update: {
            city: location?.city,
            state: location?.state,
          },
          where: {
            id: locationEntry?.id,
          },
        },
      },
      tags: {
        connect: validTags.map(tagId => ({ id: tagId })),
      },
    },
    where: {
      id: id?.toString(),
    },
  })
}
