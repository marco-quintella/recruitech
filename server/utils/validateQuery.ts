import type { EventHandlerRequest, H3Event } from 'h3'
import type { z } from 'zod'

export async function validateQuery<T extends EventHandlerRequest['query']>(
  event: H3Event<{
    query: T
  }>,
  validation: z.ZodType,
  customMessage?: string,
) {
  const validation1 = await getValidatedQuery(event, query => validation.safeParse(query))

  if (!validation1.success) {
    throw createError({
      data: validation1.error,
      statusCode: 400,
      statusMessage: customMessage ?? 'Dados inválidos',
    })
  }

  return validation1.data as T
}
