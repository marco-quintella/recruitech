import { z } from 'zod'

export type GetApplicationQUery = QueryObject & {
  processId?: string
  profileId?: string
}

export default defineCachedEventHandler(async (event) => {
  // Validation Layer
  const { processId, profileId } = await validateQuery<GetApplicationQUery>(event, z.object({
    processId: z.string().trim().uuid().nullish(),
    profileId: z.string().trim().nullish().or(z.string().max(0)),
  }))

  // Service Layer
  return getApplications({
    filters: {
      processId,
      profileId,
    },
  })
}, {
  base: 'redis',
  maxAge: 15,
  name: 'getApplications',
})
