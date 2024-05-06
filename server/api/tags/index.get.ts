import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { name } = await validateQuery<{
    name: string
  }>(event, z.object({
    name: z.string().trim().min(3),
  }))

  const tags = await getTagsByName(name)
  return tags
})
