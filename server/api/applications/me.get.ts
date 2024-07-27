import { validateIsCandidate } from '../../utils/validateIsCandidate'

export default defineEventHandler(async (event) => {
  const { data: user } = await requireAuthSession(event)
  validateIsCandidate(user)

  return getApplications({
    asUser: true,
    filters: {
      userId: user.id,
    },
    pagination: {
      orderBy: 'createdAt',
    },
  })
})
