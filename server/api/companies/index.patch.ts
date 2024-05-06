import { z } from 'zod'

interface UpdateCompanyBody {
  id: string
  name: string
}

export default defineEventHandler(async (event) => {
  // Validation Layer
  const { id, name } = await validateBody<UpdateCompanyBody>(event, z.object({
    id: z.string().trim().uuid(),
    name: z.string().trim().min(1),
  }))
  const { data: user } = await requireAuthSession(event)
  validateIsCompanyAdmin(user, id)
  const company = await getCompanyById(id)
  if (!company)
    throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

  // Service Layer
  await updateCompany(id, { name })
})
