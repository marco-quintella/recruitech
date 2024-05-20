import consola from 'consola'
import { z } from 'zod'

interface AuthRegisterBody {
  name: string
  email: string
  password: string
  role: Role
  companyName?: string
}

export default defineEventHandler(async (event) => {
  const { auth: { password_salt } } = useRuntimeConfig()
  if (!password_salt) {
    consola.error('passwordSalt is not found in env')
    throw createError({ status: 500, statusMessage: 'Internal Server Error' })
  }

  const { companyName, email, name, password, role } = await validateBody<AuthRegisterBody>(event, z.object({
    companyName: z.string().trim().optional(),
    email: z.string().trim().email(),
    name: z.string().trim().min(1),
    password: z.string().trim().min(8),
    role: z.enum(['company_admin', 'candidate']),
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
      companyId: company.id,
      email,
      name,
      password: await hash(password),
      role,
    })
  }
  else {
    user = await insertUser({
      email,
      name,
      password: await hash(password),
      role,
    })
  }

  sendRegisterConfirmationEmail(user)

  setResponseStatus(event, 201)
})
