import { z } from 'zod'

export const integerSchema = z.string().trim().transform((s, ctx) => {
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

export const numberSchema = z.string().trim().transform((s, ctx) => {
  const parsedNumber = Number(s)
  if (Number.isNaN(parsedNumber)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a number',
    })
    return z.NEVER
  }
  return parsedNumber
})
