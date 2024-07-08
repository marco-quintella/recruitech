import consola from 'consola'

export function validateIsNotCandidate(
  user: AuthSession | User,
) {
  consola.info(user)
  if (!user.id || user.role === RoleEnum.candidate) {
    throw createError({
      message: 'Você não tem permissão para fazer isso',
      status: 403,
    })
  }
}
