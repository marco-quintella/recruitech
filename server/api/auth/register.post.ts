import process from 'node:process'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import type { Role } from '~/db/role'
import { users } from '~/db/users'

export default defineEventHandler<{ body: {
  name: string
  email: string
  password: string
  role: Role
} }>(async (event) => {
  if (!process.env.PASSWORD_SALT) {
    console.error('PASSWORD_SALT is not found in env')
    throw createError({ status: 500, message: 'Internal Server Error' })
  }

  const validation = await readValidatedBody(event, async body => z.object({
    name: z.string().trim(),
    email: z.string().email().trim(),
    password: z.string().min(8).trim(),
    role: z.enum(['company_admin', 'recruiter', 'candidate']),
  }).safeParse(body))

  if (!validation.success)
    throw createError({ statusCode: 400, message: 'Dados inválidos', data: validation.error })

  const { name, email, password, role } = validation.data

  const possibleUser = await db.select({ id: users.id }).from(users).where(eq(users.email, email))
  if (possibleUser.length > 0)
    throw createError({ statusCode: 400, message: 'Um usuário com este e-mail já existe.' })

  await db.insert(users).values({
    email,
    password: await hash(password),
    name,
    role,
  })

  setResponseStatus(event, 201)
  return 'Usuário criado com sucesso.'
})
