import { z } from 'zod'

export type GetApplicationQUery = QueryObject & {
  company?: boolean
  processId?: string
  profileId?: string
}

export default defineCachedEventHandler(async (event) => {
  const { data: user } = await useAuthSession(event)

  // Validation Layer
  const { company, processId, profileId } = await validateQuery<GetApplicationQUery>(event, z.object({
    company: booleanSchema.nullish(),
    processId: z.string().trim().uuid().nullish(),
    profileId: z.string().trim().nullish().or(z.string().max(0)),
  }))

  if (company) {
    validateIsCompanyMember(user)
    return getApplications({
      filters: {
        companyId: user.companyId,
        processId,
        profileId,
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
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getApplications',
})
