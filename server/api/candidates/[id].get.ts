import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const session = await requireAuthSession(event)
  validateIsNotCandidate(session.data)

  const id = validateRouteParam(event, 'id', z.string().uuid())

  return await getCandidateById(id)
})
