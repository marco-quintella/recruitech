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
      statusMessage: 'E-mail não encontrado',
      statusCode: 401,
    })
  }

  if (!user.confirmedEmail) {
    throw createError({
      statusMessage: 'E-mail não confirmado. Por favor verifique sua caixa de e-mail.',
      statusCode: 401,
    })
  }

  if (user.password !== (await hash(password))) {
    throw createError({
      statusMessage: 'Senha incorreta',
      statusCode: 401,
    })
  }

  // Service Layer
  const session = await useAuthSession(event)
  await session.update({
    id: user.id,
    name: user.name,
    email: user.email,
    companyId: user.companyId,
    confirmedEmail: user.confirmedEmail,
    role: user.role,
  })
  return session
})
