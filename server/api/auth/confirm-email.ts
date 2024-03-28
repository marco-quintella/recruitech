import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { emailTokens } from '~/db/email-tokens'
import { users } from '~/db/users'

export default defineEventHandler<{ body: { token: string } }>(async (event) => {
  // Validation
  const validation = await readValidatedBody(event, body => z.object({ token: z.string().uuid() }).safeParse(body))

  if (!validation.success)
    throw createError({ statusCode: 400, statusMessage: 'Dados Inválidos', data: validation.error })

  const { token } = validation.data

  // Fetch token data from DB
  const query = await db.select().from(emailTokens)
    .where(eq(emailTokens.id, token))
    .leftJoin(users, eq(emailTokens.userId, users.id))
    .limit(1)

  // If token is not found, throw error
  if (query.length === 0)
    throw createError({ statusCode: 400, statusMessage: 'Token inválido' })

  const tokenObject = query[0]

  // If user is not found, throw error
  // Just used for TS safety, this should never happen
  if (!tokenObject.users?.id)
    throw createError({ statusCode: 400, statusMessage: 'Usuário não encontrado' })

  // If email is already confirmed, throw error
  if (tokenObject.users?.confirmedEmail)
    throw createError({ statusCode: 400, statusMessage: 'Email já confirmado' })

  // Update user to confirm email
  await db.update(users).set({ confirmedEmail: true }).where(eq(users.id, tokenObject.users.id))

  // Delete token entry from DB
  await db.delete(emailTokens).where(eq(emailTokens.id, token))

  await sendEmailConfirmedWelcome(tokenObject.users)

  setResponseStatus(event, 204)
})
