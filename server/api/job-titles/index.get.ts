import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { name } = await validateQuery<{
    name: string
  }>(event, z.object({
    name: z.string().trim().optional(),
  }))

  if (name) {
    const jobTitles = await getJobTitlesByName(name)
    return jobTitles
  }

  return await getJobTitles()
})
