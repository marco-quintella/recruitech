import { z } from 'zod'

export default defineEventHandler<{
  body: {
    fileBase64: string
  }
  params: {
    id: string
  }
}>(async (event) => {
  // Validation Layer
  const { data: user } = await requireAuthSession(event)

  const { fileBase64, id } = await validateBody<{
    fileBase64: string
    id: string
  }>(event, z.object({
    fileBase64: z.string().min(1),
    id: z.string().trim().uuid(),
  }))

  validateIsCompanyAdmin(user, id)

  let ext = 'png'

  if (fileBase64.startsWith('data:image/'))
    ext = fileBase64.split(';')[0].split('/')[1]

  const cleanedfileBase64 = fileBase64.replace(/^data:image\/\w+;base64,/, '')

  // Service Layer
  const url = await uploadImage({
    fileBase64: cleanedfileBase64,
    refString: `companies/${id}/logo.${ext}`,
  })
  await updateCompanyLogo(id, url)
})
