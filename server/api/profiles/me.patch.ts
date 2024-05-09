import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  const { data: session } = await requireAuthSession(event)

  const { presentation, tags } = await validateBody<{
    presentation?: string
    tags?: string[]
  }>(event, z.object({
    presentation: z.string().max(5000).optional(),
    tags: z.array(z.string().trim().uuid()).optional(),
  }))

  // Business Logic
  const profile = await updateProfile({
    presentation,
    tags,
    userId: session.id,
  })

  return profile
})
