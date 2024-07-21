import { z } from 'zod'

export type GetCandidatesQuery = QueryObject & {
  page?: number
  pageSize?: number
  search?: string
  location?: string
  orderBy?: string
  favorite?: boolean
  discard?: boolean
}

export default defineEventHandler(async (event) => {
  const session = await requireAuthSession(event)
  validateIsNotCandidate(session.data)

  const {
    discard,
    favorite,
    location,
    orderBy,
    page,
    pageSize,
    search,
  } = await validateQuery<GetCandidatesQuery>(event, z.object({
    discard: booleanSchema.nullish(),
    favorite: booleanSchema.nullish(),
    location: z.string().uuid().nullish(),
    orderBy: z.string().nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    search: z.string().nullish(),
  }))

  return await getCandidates({
    filters: {
      discard,
      favorite,
      location,

    },
    pagination: {
      orderBy,
      page,
      pageSize,
    },
    requestUserId: session.data.id,
    search,
  })
})
