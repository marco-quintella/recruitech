import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  const { data: user } = await requireAuthSession(event)

  const { fileBase64, id: profileId } = await validateBody<{
    fileBase64: string
    id: string
  }>(event, z.object({
    fileBase64: z.string().min(1),
    id: z.string().trim().uuid(),
  }))

  const profile = await getProfileById(profileId)

  if (profile?.userId !== user.id)
    throw createError({ statusCode: 401, statusMessage: 'Você não tem autorização para editar esse perfil' })

  let ext = 'pdf'

  if (!fileBase64.startsWith('data:application/pdf'))
    throw createError({ statusCode: 400, statusMessage: 'Arquivo deve ter formato PDF.' })

  ext = fileBase64.split(';')[0].split('/')[1]

  const cleanedfileBase64 = fileBase64.replace(/^data:application\/\w+;base64,/, '')

  // Service Layer
  const url = await uploadImage({
    fileBase64: cleanedfileBase64,
    refString: `profile/${profileId}/cv.${ext}`,
  })

  await updateProfile({
    cv: url,
    userId: user.id,
  })

  return url
})
