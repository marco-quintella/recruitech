import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { users } from '~/db/users'

export default defineEventHandler<{
  body: {
    name: string
  }
}>(async (event) => {
  const validation = await readValidatedBody(
    event,
    async body => z.object({
      name: z.string().trim().min(1),
    }).safeParse(body),
  )

  if (validation.success === false) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: validation.error,
    })
  }

  const { name } = validation.data

  const session = await useAuthSession(event)
  const user = session.data

  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'Não autorizado' })

  const id = user.id

  const usersQuery = await db.select({ id: users.id })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  if (!usersQuery.length)
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })

  await db.update(users).set({ name }).where(eq(users.id, id))

  setResponseStatus(event, 204)
})
