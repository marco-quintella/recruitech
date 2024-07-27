import { z } from 'zod'
import { RoleEnum } from '../../utils/enums'

export default defineEventHandler(async (event) => {
  // Validation Layer

  // Validate Inputs
  const { id: targetUserId, role } = await validateBody<{
    id: string
    role: RoleEnum
  }>(event, z.object({
    id: z.string().trim().uuid(),
    role: z.enum([RoleEnum.candidate, RoleEnum.company_admin, RoleEnum.recruiter]),
  }))

  // Authentication
  const { data: userData } = await requireAuthSession(event)

  if (targetUserId === userData.id)
    throw createError({ status: 400, statusMessage: 'Você não pode alterar sua própria função' })

  // Validate target User belongs to a company
  const targetUser = await getPrivateUserById(targetUserId)
  if (!targetUser?.companyId)
    throw createError({ status: 400, statusMessage: 'Usuário não pertence a nenhuma empresa' })

  // Authorization
  await validateIsCompanyAdmin(userData, targetUser.companyId)

  // Service Layer
  await updateUser(targetUserId, { role })

  return true
})
