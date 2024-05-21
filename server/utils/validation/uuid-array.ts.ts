import { z } from 'zod'

export const uuidArraySchema = z.string().trim().transform((s, ctx) => {
  if (!s) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Empty string',
    })
    return z.NEVER
  }

  if (typeof s !== 'string') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a string',
    })
    return z.NEVER
  }

  const array = s.split(',').map(id => id.trim())
  array.forEach((id) => {
    z.string().uuid().parse(id)
  })

  return array
})
