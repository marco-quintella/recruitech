export default defineEventHandler(async (event) => {
  // Validation Layer
  const { data: userSession } = await requireAuthSession(event)
  validateIsCompanyMember(userSession)
  if (!userSession.companyId)
    return // Only for TS, process already validated

  // Service Layer
  const company = await getCompanyById(userSession.companyId)

  if (!company)
    throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })

  return company
})
