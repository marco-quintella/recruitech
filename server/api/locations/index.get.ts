import { z } from 'zod'

export type GetLocationsQuery = QueryObject & {
  search?: string
}

export default defineCachedEventHandler(async (event) => {
  const { search } = await validateQuery<GetLocationsQuery>(event, z.object({
    search: z.string().trim().optional(),
  }))

  return await getLocations({
    search,
  })
}, {
  base: 'redis',
  maxAge: 15,
})
