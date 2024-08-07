import type { users } from '@prisma/client'

export function validateIsCompanyMember(
  user: AuthSession | users,
  companyId?: string,
) {
  if (companyId) {
    if (
      user.companyId !== companyId
      || (
        user.role !== RoleEnum.company_admin
        && user.role !== RoleEnum.recruiter
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
      user.role !== RoleEnum.company_admin
      && user.role !== RoleEnum.recruiter
    ) {
      throw createError({
        message: 'Você não tem permissão para fazer isso',
        status: 403,
      })
    }
  }
}
