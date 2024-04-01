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
  const id = validateRouteParam(event, 'id', z.string().uuid())
  const { data: user } = await requireAuthSession(event)
  validateIsCompanyAdmin(user, id)
  const { fileBase64 } = await validateBody(event, z.object({
    fileBase64: z.string().min(1),
  }))

  // Service Layer
  const url = await uploadImage({ fileBase64, refString: `companies/${id}/logo` })
  await updateCompanyLogo(id, url)
})
