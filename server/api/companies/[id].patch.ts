import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { companies } from '~/db/companies'

export default defineEventHandler<{
  body: {
    name: string
  }
  params: {
    id: string
  }
}>(async (event) => {
  const validation = await readValidatedBody(
    event,
    async body => await z.object({
      name: z.string().trim().min(1),
    }).safeParse(body),
  )

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: validation.error,
    })
  }

  const id = getRouterParam(event, 'id')
  const validation2 = await z.string().uuid().safeParse(id)

  if (!validation2.success || !id)
    throw createError({ statusCode: 400, statusMessage: 'Id inválido' })

  const { name } = validation.data

  const session = await useAuthSession(event)
  const user = session.data

  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'Não autorizado' })

  if (user.companyId !== id || user.role !== 'company_admin')
    throw createError({ statusCode: 401, statusMessage: 'Não autorizado' })

  await db.update(companies)
    .set({ name })
    .where(eq(companies.id, id))
})
