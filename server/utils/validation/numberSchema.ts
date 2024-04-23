import { z } from 'zod'

export const numberSchema = z.string().trim().transform((s, ctx) => {
  const parsedInt = Number.parseInt(s)
  if (Number.isNaN(parsedInt)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a number',
    })
    return z.NEVER
  }
  return parsedInt
})
