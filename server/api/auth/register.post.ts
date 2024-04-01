import { z } from 'zod'

export default defineEventHandler<{ body: {
  name: string
  email: string
  password: string
  role: Role
  companyName?: string
} }>(async (event) => {
  const { auth: { password_salt } } = useRuntimeConfig()
  if (!password_salt) {
    console.error('PASSWORD_SALT is not found in env')
    throw createError({ status: 500, statusMessage: 'Internal Server Error' })
  }

  const { name, email, password, role, companyName } = await validateBody(event, z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: z.string().trim().min(8),
    role: z.enum(['company_admin', 'candidate']),
    companyName: z.string().trim().optional(),
  }))

  const possibleUser = await getUserByEmail(email)
  if (possibleUser)
    throw createError({ statusCode: 400, statusMessage: 'Um usuário com este e-mail já existe.' })

  if (role === 'company_admin' && !companyName)
    throw createError({ statusCode: 400, statusMessage: 'Nome da empresa é obrigatório para administradores de empresa.' })

  // Service Layer
  let user: User | undefined

  if (role === 'company_admin' && companyName) {
    const possibleCompany = await getCompanyByName(companyName)
    if (possibleCompany)
      throw createError({ statusCode: 400, statusMessage: 'Uma empresa com este nome já existe.' })

    const company = await insertCompany({ name: companyName })
    user = await insertUser({
      email,
      password: await hash(password),
      name,
      role,
      companyId: company.id,
    })
  }
  else {
    user = await insertUser({
      email,
      password: await hash(password),
      name,
      role,
    })
  }

  sendRegisterConfirmationEmail(user)

  setResponseStatus(event, 201)
})
