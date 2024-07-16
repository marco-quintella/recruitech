import { string, z } from 'zod'

export default defineEventHandler(async (event) => {
  const { data: { id: userId } } = await requireAuthSession(event)

  const { candidateId, processId } = await validateQuery<{
    processId?: string
    candidateId?: string
  }>(event, z.object({
    candidateId: string().trim().uuid().optional(),
    processId: string().trim().uuid().optional(),
  }))

  return await getDiscards({ candidateId, processId, userId })
})
