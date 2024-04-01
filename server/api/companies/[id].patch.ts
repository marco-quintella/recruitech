import { z } from 'zod'

export default defineEventHandler<{
  body: {
    name: string
  }
  params: {
    id: string
  }
}>(async (event) => {
  // Validation Layer
  const { name } = await validateBody(event, z.object({ name: z.string().trim().min(1) }))
  const id = validateRouteParam(event, 'id', z.string().trim().uuid())
  const { data: user } = await requireAuthSession(event)
  validateIsCompanyAdmin(user, id)
  const company = await getCompanyById(id)
  if (!company)
    throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

  // Service Layer
  await updateCompany(id, { name })
})
