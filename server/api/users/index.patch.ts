import { z } from 'zod'
import { eq } from 'drizzle-orm'

export default defineEventHandler<{
  body: {
    name: string
  }
}>(async (event) => {
  // Validation Layer
  const { name } = await validateBody(event, z.object({ name: z.string().trim().min(1) }))
  const { data: userSession } = await requireAuthSession(event)
  const id = userSession.id

  const user = await getUserByEmail(userSession.email)
  if (!user)
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })

  // Service Layer
  await db.update(users).set({ name }).where(eq(users.id, id))
  setResponseStatus(event, 204)
})
