import type { users } from '@prisma/client'

export function validateIsCandidate(
  user: AuthSession | users,
) {
  if (user.role !== RoleEnum.candidate) {
    throw createError({
      message: 'Este recurso está disponível somente para candidatos.',
      status: 403,
    })
  }
}
