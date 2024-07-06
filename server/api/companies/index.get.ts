import { z } from 'zod'

export type GetCompaniesQuery = QueryObject & {
  id?: string
  search?: string
}

export default defineCachedEventHandler(async (event) => {
  // Validation Layer
  const { id, search } = await validateQuery<GetCompaniesQuery>(event, z.object({
    id: z.string().trim().uuid().nullish(),
    search: z.string().trim().nullish().or(z.string().max(0)),
  }))

  // Service Layer
  return getCompanies({
    filters: {
      id,
    },
    search,
  })
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getCompanies',
})
