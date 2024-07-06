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
      data: validation1.error,
      statusCode: 400,
      statusMessage: customMessage ?? 'Dados inválidos',
    })
  }

  return validation1.data as T
}
