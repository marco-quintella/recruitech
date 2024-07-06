import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { data: user } = await requireAuthSession(event)

  const { processId } = await validateBody<{ processId: string }>(event, z.object({
    processId: z.string().trim().uuid(),
  }))

  const process = await getProcessById(processId)
  const profile = await getProfileByUserId(user.id)

  if (!profile)
    throw createError({ statusCode: 404, statusMessage: 'Perfil não encontrado' })

  if (!!process?.finishedAt || !!process?.cancelledAt)
    throw createError({ statusCode: 400, statusMessage: 'Processo finalizado ou cancelado' })

  await createApplication({
    processId,
    profileId: profile?.id,
  })
})
