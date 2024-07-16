import type { users } from '@prisma/client'
import { role } from '@prisma/client'

export function validateIsCompanyMember(
  user: AuthSession | users,
  companyId?: string,
) {
  if (companyId) {
    if (
      user.companyId !== companyId
      || (
        user.role !== role.company_admin
        && user.role !== role.recruiter
      )
    ) {
      throw createError({
        message: 'Você não tem permissão para fazer isso',
        status: 403,
      })
    }
  }
  else {
    if (
      user.role !== role.company_admin
      && user.role !== role.recruiter
    ) {
      throw createError({
        message: 'Você não tem permissão para fazer isso',
        status: 403,
      })
    }
  }
}
