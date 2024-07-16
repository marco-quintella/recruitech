import { z } from 'zod'

export type GetCandidatesQuery = QueryObject & {
  page?: number
  pageSize?: number
  search?: string
  location?: string
  orderBy?: string
}

export default defineEventHandler(async (event) => {
  const session = await useAuthSession(event)
  validateIsNotCandidate(session.data)

  const {
    location,
    page,
    pageSize,
    search,
  } = await validateQuery<GetCandidatesQuery>(event, z.object({
    location: z.string().uuid().nullish(),
    orderBy: z.string().nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    search: z.string().nullish(),
  }))

  return await getCandidates({
    filters: {
      location,
    },
    pagination: {
      page,
      pageSize,
    },
    search,
  })
})
