export function validateIsCompanyAdmin(user: AuthSession | User, companyId: string) {
  if (user.companyId !== companyId || user.role !== 'company_admin') {
    throw createError({
      message: 'Você não tem permissão para fazer isso',
      status: 403,
    })
  }
}
