import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { companies } from '~/db/companies'

export default defineEventHandler<{
  body: {
    fileBase64: string
  }
  params: {
    id: string
  }
}>(async (event) => {
  // Validar se o id é um uuid
  const id = getRouterParam(event, 'id')
  const validation1 = await z.string().uuid().safeParse(id)

  if (validation1.success === false || !id) {
    throw createError({
      message: 'Id inválido',
      status: 400,
    })
  }

  // Validar se o usuário é um company_admin da empresa
  const session = await useAuthSession(event)
  const { data: user } = session

  if (!user) {
    throw createError({
      message: 'Você precisa estar logado',
      status: 401,
    })
  }

  if (user.companyId !== id || user.role !== 'company_admin') {
    throw createError({
      message: 'Você não tem permissão para fazer isso',
      status: 403,
    })
  }

  // Validar se o body válido
  const validation2 = await readValidatedBody(
    event,
    async body => await z.object({
      fileBase64: z.string().min(1),
    }).safeParse(body),
  )

  if (validation2.success === false) {
    throw createError({
      message: 'Arquivo inválido',
      status: 400,
    })
  }

  const { fileBase64 } = validation2.data

  // Upload da imagem pro bucket
  const url = await uploadImage({ fileBase64, refString: `companies/${id}/logo` })

  if (!url) {
    throw createError({
      message: 'Erro ao fazer upload da imagem',
      status: 500,
    })
  }

  // Atualizar o logo da empresa no banco de dados
  await db.update(companies)
    .set({ logo: url })
    .where(eq(companies.id, id))
    .returning()
})
