import { z } from 'zod'

export type GetCandidatesQuery = QueryObject & {
  page?: number
  pageSize?: number
  search?: string
}

export default defineEventHandler(async (event) => {
  const { data } = await useAuthSession(event)
  validateIsNotCandidate(data)

  const {
    page,
    pageSize,
    search,
  } = await validateQuery<GetCandidatesQuery>(event, z.object({
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    search: z.string().nullish(),
  }))

  return await getCandidates({
    pagination: {
      page,
      pageSize,
    },
    search,
  })
})
