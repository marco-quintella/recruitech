import type { H3Event } from 'h3'
import type { z } from 'zod'

export async function validateBody<T = any>(
  event: H3Event<{
    body: T
  }>,
  validation: z.ZodType,
  customMessage?: string,
) {
  const validation1 = await readValidatedBody(event, body => validation.safeParse(body))

  if (!validation1.success) {
    throw createError({
      statusCode: 400,
      statusMessage: customMessage ?? 'Dados inválidos',
      data: validation1.error,
    })
  }

  return validation1.data as T
}
