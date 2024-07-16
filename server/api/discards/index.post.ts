import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { data: { id: userId, role } } = await requireAuthSession(event)

  const { candidateId, processId } = await validateBody<{
    processId?: string
    candidateId?: string
  }>(event, z.object({
    candidateId: z.string().trim().uuid().optional(),
    processId: z.string().trim().uuid().optional(),
  }))

  if (role === 'candidate') {
    if (!processId)
      throw createError({ message: 'Id da vaga é obrigatórios', statusCode: 400 })

    return await createDiscard({ processId, userId })
  }
  else if (role === 'company_admin' || role === 'recruiter') {
    if (!candidateId)
      throw createError({ message: 'Id do candidato é obrigatórios', statusCode: 400 })

    return await createDiscard({ candidateId, userId })
  }
})
