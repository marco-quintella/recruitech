import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  await requireAuthSession(event)
  const { id, name } = await validateBody<{
    id: string
    name: string
  }>(event, z.object({
    id: z.string().trim().uuid(),
    name: z.string().trim().min(3),
  }))

  const tag = await getTagById(id)
  if (!tag) {
    throw createError({
      message: 'Tag não existe',
      status: 404,
    })
  }

  // Service Layer
  const updatedTag = await updateTag(id, { name })
  return updatedTag
})
