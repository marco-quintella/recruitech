import { z } from 'zod'

export default defineEventHandler<{
  body: { email: string, password: string }
}>(async (event) => {
  // Validation Layer
  const { email, password } = await validateBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }))

  const user = await getUserByEmail(email)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'E-mail não encontrado',
    })
  }

  if (!user.confirmedEmail) {
    throw createError({
      statusCode: 401,
      statusMessage: 'E-mail não confirmado. Por favor verifique sua caixa de e-mail.',
    })
  }

  if (user.password !== (await hash(password))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Senha incorreta',
    })
  }

  // Service Layer
  const session = await useAuthSession(event)
  await session.update({
    companyId: user.companyId,
    confirmedEmail: user.confirmedEmail,
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role,
  })
  return session
})
