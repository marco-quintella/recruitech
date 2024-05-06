import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  await requireAuthSession(event)

  const { name } = await validateBody<{
    name: string
  }>(event, z.object({ name: z.string().trim().min(3) }))

  // Service Layer
  const possibleTag = await getTagByName(name)
  return possibleTag
})
