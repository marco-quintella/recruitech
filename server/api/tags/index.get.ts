import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { name } = await validateQuery<{
    name: string
  }>(event, z.object({
    name: z.string().trim().optional(),
  }))

  if (name) {
    const tags = await getTagsByName(name)
    return tags
  }

  const tags = await getTags()
  return tags
})
