import process from 'node:process'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { sendRegisterConfirmationEmail } from '../../utils/mail/register.confirmation.mail.ts'
import { companies } from '~/db/companies'
import type { Role } from '~/db/role'
import type { User } from '~/db/users'
import { users } from '~/db/users'

export default defineEventHandler<{ body: {
  name: string
  email: string
  password: string
  role: Role
  companyName?: string
} }>(async (event) => {
  if (!process.env.PASSWORD_SALT) {
    console.error('PASSWORD_SALT is not found in env')
    throw createError({ status: 500, statusMessage: 'Internal Server Error' })
  }

  const validation = await readValidatedBody(event, async body => z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: z.string().trim().min(8),
    role: z.enum(['company_admin', 'candidate']),
    companyName: z.string().trim().optional(),
  }).safeParse(body))

  if (!validation.success)
    throw createError({ statusCode: 400, statusMessage: 'Dados inválidos', data: validation.error })

  const { name, email, password, role, companyName } = validation.data

  const possibleUser = await db.select({ id: users.id }).from(users).where(eq(users.email, email))
  if (possibleUser.length > 0)
    throw createError({ statusCode: 400, statusMessage: 'Um usuário com este e-mail já existe.' })

  if (role === 'company_admin' && !companyName)
    throw createError({ statusCode: 400, statusMessage: 'Nome da empresa é obrigatório para administradores de empresa.' })

  let user: User | undefined

  if (role === 'company_admin' && companyName) {
    const possibleCompany = await db.select({ id: companies.id }).from(companies).where(eq(companies.name, companyName))
    if (possibleCompany.length > 0)
      throw createError({ statusCode: 400, statusMessage: 'Uma empresa com este nome já existe.' })

    await db.insert(companies).values({ name: companyName })

    const company = await db.select({ id: companies.id }).from(companies).where(eq(companies.name, companyName)).limit(1)

    const insert = await db.insert(users).values({
      email,
      password: await hash(password),
      name,
      role,
      companyId: company[0].id,
    }).returning()

    user = insert[0]
  }
  else {
    const insert = await db.insert(users).values({
      email,
      password: await hash(password),
      name,
      role,
    }).returning()

    user = insert[0]
  }

  sendRegisterConfirmationEmail(user)

  setResponseStatus(event, 201)
})
