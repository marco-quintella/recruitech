import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { companies } from '~/db/companies'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const valid = await z.string().uuid().safeParse(id)

  if (valid.success === false || !id)
    throw createError({ status: 400, statusMessage: 'Id Inválido' })

  const query = await db.select()
    .from(companies)
    .where(eq(companies.id, id))
    .limit(1)

  if (query.length === 0)
    throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

  return query[0]
})
