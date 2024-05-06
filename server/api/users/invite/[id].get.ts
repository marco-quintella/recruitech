import { z } from 'zod'

export default defineEventHandler(async (event) => {
  // Validation Layer
  const id = await validateRouteParam(event, 'id', z.string().trim().uuid())

  // Service Layer
  const user = await getPrivateUserById(id)

  if (!user)
    throw createError({ status: 404, statusMessage: 'Usuário não encontrado' })

  return user
})
