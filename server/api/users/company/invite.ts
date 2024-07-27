import { z } from 'zod'

export default defineEventHandler<{
  body: {
    email: string
  }
}>(async (event) => {
  // Validation Layer
  const { email } = await validateBody(event, z.object({
    email: z.string().trim().email(),
  }))

  const { data: userSession } = await requireAuthSession(event)
  validateIsCompanyAdmin(userSession)
  const companyId = userSession.companyId!
  const role = RoleEnum.recruiter

  const usersExists = await getUserByEmail(email)

  if (usersExists)
    throw createError({ status: 400, statusMessage: 'Já existe um usuário com esse email' })

  // Service Layer
  const tempUser = await createUserInvite(email, role, companyId)
  const company = await getCompanyById(companyId)
  if (!company)
    return
  await sendInviteEmail(tempUser.id, email, { name: company?.name })

  setResponseStatus(event, 201)
  return true
})
