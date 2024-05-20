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
    email: z.string().trim().email(),
    id: z.string().uuid(),
    name: z.string().trim(),
    password: z.string().min(8),
  }))

  const publicUser = await getPublicUserById(id)

  if (!publicUser)
    throw createError({ message: 'Usuário não existe', status: 404 })

  // Service Layer
  return await updateUser(id, {
    confirmedEmail: true,
    email,
    invitePending: false,
    name,
    password: await hash(password),
  })
})
