import { z } from 'zod'

export default defineEventHandler<{
  body: {
    id: string
    name: string
    email: string
    password: string
  }
}>(async (event) => {
  // Validation Layer
  const { email, id, name, password } = await validateBody(event, z.object({
    id: z.string().uuid(),
    name: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().min(8),
  }))

  const publicUser = await getPublicUserById(id)

  if (!publicUser)
    throw createError({ status: 404, message: 'Usuário não existe' })

  // Service Layer
  return await updateUser(id, {
    name,
    email,
    password: await hash(password),
    invitePending: false,
    confirmedEmail: true,
  })
})
