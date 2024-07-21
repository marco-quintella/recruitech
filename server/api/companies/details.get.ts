import { z } from 'zod'

export type GetCompanyDetails = Awaited<ReturnType<typeof getCompanyDetails>>

export default defineEventHandler(async (event) => {
  const { id } = await validateQuery<{ id: string }>(event, z.object({
    id: z.string().trim().uuid(),
  }))

  return await getCompanyDetails(id)
})
