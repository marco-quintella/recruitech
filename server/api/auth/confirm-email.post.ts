import { z } from 'zod'

export default defineEventHandler<{ body: { token: string } }>(async (event) => {
  // Validation Layer
  const { token } = await validateBody(event, z.object({ token: z.string().trim().uuid() }))

  const tokenObject = await getOneEmailTokenById(token)
  if (!tokenObject)
    throw createError({ statusCode: 400, statusMessage: 'Token inválido' })

  // If user is not found, throw error
  // Just used for TS safety, this should never happen
  if (!tokenObject.users?.id)
    throw createError({ statusCode: 400, statusMessage: 'Usuário não encontrado' })

  // If email is already confirmed, throw error
  if (tokenObject.users?.confirmedEmail)
    throw createError({ statusCode: 400, statusMessage: 'Email já confirmado' })

  // Service Layer
  await Promise.all([
    // Update user to confirm email
    setEmailConfirmed(tokenObject.users.id),

    // Delete token entry from DB
    deleteEmailToken(token),

    // Send welcome email
    sendEmailConfirmedWelcome(tokenObject.users),
  ])

  setResponseStatus(event, 204)
})
