import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { users } from '~/db/users'

export default defineEventHandler<{
  body: {
    id: string
    name: string
  }
}>(async (event) => {
  const validation = await readValidatedBody(event, async body => z.object({
    id: z.string().trim().uuid(),
    name: z.string().trim().min(1),
  }).safeParse(body))

  if (validation.success === false)
    throw createError({ statusCode: 400, statusMessage: 'Dados inválidos', data: validation.error })

  const { id, name } = validation.data

  const usersQuery = await db.select({ id: users.id }).from(users).where(eq(users.id, id)).limit(1)

  if (!usersQuery.length)
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })

  await db.update(users).set({ name }).where(eq(users.id, id))

  setResponseStatus(event, 204)
})
