import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const id = await validateRouteParam(event, 'id', z.string().trim().uuid())

  const { data: user } = await requireAuthSession(event)

  const probableProcess = await getProcessById(id)
  if (!probableProcess?.id)
    throw createError({ statusCode: 404, statusMessage: 'Processo não encontrado' })
  if (probableProcess.cancelledAt)
    throw createError({ statusCode: 400, statusMessage: 'Processo já cancelado' })
  if (probableProcess.finishedAt)
    throw createError({ statusCode: 400, statusMessage: 'Processo já finalizado' })

  validateIsCompanyMember(user, probableProcess.companyId)

  return await updateProcess({
    finishedAt: new Date().toISOString(),
    id: probableProcess.id,
  })
})
