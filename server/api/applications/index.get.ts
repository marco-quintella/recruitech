import type { Prisma } from '@prisma/client'
import { z } from 'zod'

export type GetApplicationQUery = QueryObject & {
  company?: boolean
  processId?: string
  profileId?: string
  discard?: boolean
  favorite?: boolean
  state?: string
  country?: string
  city?: string

  direction?: 'asc' | 'desc'
  orderBy?: keyof Prisma.applicationsOrderByWithRelationInput
  page?: number
  pageSize?: number
}

export default defineEventHandler(async (event) => {
  const { data: user } = await requireAuthSession(event)

  // Validation Layer
  const {
    city,
    company,
    country,
    direction,
    discard,
    favorite,
    orderBy,
    page,
    pageSize,
    processId,
    profileId,
    state,
  } = await validateQuery<GetApplicationQUery>(event, z.object({
    city: z.string().trim().nullish(),
    company: booleanSchema.nullish(),
    country: z.string().trim().nullish(),
    direction: z.enum(['asc', 'desc']).nullish(),
    discard: booleanSchema.nullish(),
    favorite: booleanSchema.nullish(),
    orderBy: z.string().trim().nullish(),
    page: numberSchema.nullish(),
    pageSize: numberSchema.nullish(),
    processId: z.string().trim().uuid().nullish(),
    profileId: z.string().trim().nullish().or(z.string().max(0)),
    state: z.string().trim().nullish(),
  }))

  if (company) {
    validateIsCompanyMember(user)
    return getApplications({
      filters: {
        companyId: user.companyId,
        discard,
        favorite,
        location: {
          city,
          country,
          state,
        },
        processId,
        profileId,
        requestingUserId: user.id,
      },
      pagination: {
        direction,
        orderBy,
        page,
        pageSize,
      },
    })
  }

  // Service Layer
  return getApplications({
    filters: {
      processId,
      profileId,
      userId: user.id,
    },
  })
})
