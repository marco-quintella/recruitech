import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { userId } = await validateQuery<{
    userId: string
  }>(event, z.object({ userId: z.string().uuid() }))
  return await sendUserProfileUpdateMatching(userId)
})
