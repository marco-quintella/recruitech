import type { H3Event } from 'h3'
import type { z } from 'zod'

export function validateRouteParam(
  event: H3Event,
  param: string,
  validation: z.ZodType,
) {
  const value = getRouterParam(event, param)
  const validation1 = validation.safeParse(value)

  if (validation1.success === false || !value) {
    throw createError({
      message: `${param} inválido`,
      status: 400,
    })
  }

  return value
}
