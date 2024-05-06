export function validateIsCompanyAdmin(
  user: AuthSession | User,
  companyId?: string,
) {
  if (companyId) {
    if (user.companyId !== companyId || user.role !== RoleEnum.company_admin) {
      throw createError({
        message: 'Você não tem permissão para fazer isso',
        status: 403,
      })
    }
  }
  else {
    if (user.role !== RoleEnum.company_admin) {
      throw createError({
        message: 'Você não tem permissão para fazer isso',
        status: 403,
      })
    }
  }
}
