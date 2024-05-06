import { z } from 'zod'

export const booleanSchema = z.string().trim().transform((s, ctx) => {
  if (s !== 'true' && s !== 'false') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a boolean',
    })
    return z.NEVER
  }
  return s === 'true' ? true : s === 'false' ? false : undefined
})
