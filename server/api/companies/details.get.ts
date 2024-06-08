import { z } from 'zod'

export default defineCachedEventHandler(async (event) => {
  const { id } = await validateQuery<{ id: string }>(event, z.object({
    id: z.string().trim().uuid(),
  }))

  return await getCompanyDetails(id)
}, {
  base: 'redis',
  maxAge: 15,
})
