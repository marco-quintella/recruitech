import type { users } from '@prisma/client'
import { role } from '@prisma/client'

export function validateIsNotCandidate(
  user: AuthSession | users,
) {
  if (!user.id || user.role === role.candidate) {
    throw createError({
      message: 'Você não tem permissão para fazer isso',
      status: 403,
    })
  }
}
