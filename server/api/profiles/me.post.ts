import { z } from 'zod'
import consola from 'consola'

export default defineEventHandler(async (event) => {
  const { data: session } = await requireAuthSession(event)

  const { presentation, tags } = await validateBody<{
    presentation?: string
    tags?: string[]
  }>(event, z.object({
    presentation: z.string().max(5000).optional(),
    tags: z.array(z.string().trim().uuid()).optional(),
  }))

  const profile = await createProfile({
    presentation,
    tags,
    userId: session.id,
  })

  jobManager.addJob({
    cron: {
      minute: 5,
    },
    key: `profile-${profile.id}`,
    task: async () => {
      const processes = await matchProfileToService(profile.userId)
    },
  })

  return profile
})
