import consola from 'consola'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  const { id } = await validateQuery<{
    id: string
  }>(event, z.object({
    id: z.string().trim().uuid(),
  }))

  // Service Layer
  const company = await getCompanyById(id)

  if (!company)
    throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

  return company
})
