import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  const { name } = await validateBody<{ name: string }>(event, z.object({
    name: z.string().trim().min(1),
  }))
  const { data: userSession } = await requireAuthSession(event)
  const id = userSession.id

  const user = await getUserByEmail(userSession.email)
  if (!user)
    throw createError({ statusCode: 404, statusMessage: 'Usuário não encontrado' })

  // Service Layer
  await prisma.users.update({
    data: { name },
    where: { id },
  })
  setResponseStatus(event, 204)
})
