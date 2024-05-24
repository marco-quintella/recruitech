import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { data: session } = await requireAuthSession(event)
  const userId = session.id
  const { candidateId, processId } = await validateBody<{
    processId?: string
    candidateId?: string
  }>(event, z.object({
    candidateId: z.string().trim().uuid().optional(),
    processId: z.string().trim().uuid().optional(),
  }))

  if (session.role === 'candidate') {
    if (!processId)
      throw createError({ message: 'Id da vaga é obrigatórios', statusCode: 400 })

    return await deleteFavorite({ processId, userId })
  }
  else if (session.role === 'company_admin' || session.role === 'recruiter') {
    if (!candidateId)
      throw createError({ message: 'Id do candidato é obrigatórios', statusCode: 400 })

    return await deleteFavorite({ candidateId, userId })
  }

  throw createError({
    message: 'Tipo de usuário não permitido',
    statusCode: 403,
  })
})
