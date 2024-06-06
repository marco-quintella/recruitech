import { z } from 'zod'

export default defineCachedEventHandler(async (event) => {
  // Validation Layer
  const { id } = await validateQuery<{
    id?: string
  }>(event, z.object({
    id: z.string().trim().uuid().nullish(),
  }))

  // Service Layer
  if (id) {
    const company = await getCompanyById(id)

    if (!company)
      throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

    return company
  }

  return getCompanies()
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getCompanies',
})
