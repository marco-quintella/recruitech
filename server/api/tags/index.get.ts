import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { name, search } = await validateQuery<{
    name?: string
    search?: string
  }>(event, z.object({
    name: z.string().trim().nullish(),
    search: z.string().trim().nullish(),
  }))

  if (name) {
    const tags = await getTagsByName(name)
    return tags
  }

  const tags = await getTags({ search })
  return tags
})
