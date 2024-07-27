import type { users } from '@prisma/client'

export function validateIsNotCandidate(
  user: AuthSession | users,
) {
  if (!user.role || user.role === RoleEnum.candidate) {
    throw createError({
      message: 'Você não tem permissão para fazer isso',
      status: 403,
    })
  }
}
