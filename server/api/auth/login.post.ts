import { eq } from 'drizzle-orm'
import { users } from '~/db/users'

export default defineEventHandler<{
  body: { email: string, password: string }
}>(async (event) => {
  const session = await useAuthSession(event)
  const { email, password } = await readBody(event)
  const query = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  const user = query?.[0]

  if (!user) {
    throw createError({
      statusMessage: 'E-mail não encontrado',
      statusCode: 401,
    })
  }

  if (user.password !== (await hash(password))) {
    throw createError({
      statusMessage: 'Senha incorreta',
      statusCode: 401,
    })
  }

  await session.update({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  return session
})
