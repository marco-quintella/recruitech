import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { data: {
    id: userId,
  } } = await requireAuthSession(event)

  const { candidateId, processId } = await validateQuery<{
    processId?: string
    candidateId?: string
  }>(event, z.object({
    candidateId: z.string().trim().uuid().optional(),
    process: z.string().trim().uuid().optional(),
  }))

  return await getFavorites({ candidateId, processId, userId })
})
