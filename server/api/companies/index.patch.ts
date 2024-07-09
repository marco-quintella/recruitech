import type { Prisma } from '@prisma/client'
import { z } from 'zod'

export type UpdateCompanyBody = Prisma.companiesUpdateInput & {
  id: string
  location?: Prisma.locationsCreateInput
}

export default defineEventHandler(async (event) => {
  // Validation Layer
  const body = await validateBody<UpdateCompanyBody>(event, z.object({
    companySize: z.enum(companySizeSchema).nullish(),
    facebook: z.string().trim().url().nullish(),
    id: z.string().trim().uuid(),
    instagram: z.string().trim().url().nullish(),
    linkedin: z.string().trim().url().nullish(),
    location: z.object({
      city: z.string().trim().min(1).nullish(),
      country: z.string().trim().min(1).nullish(),
      state: z.string().trim().min(1).nullish(),
    }).nullish(),
    name: z.string().trim().min(1),
    shortDescription: z.string().trim(),
    twitter: z.string().trim().url().nullish(),
    website: z.string().trim().url().nullish(),
  }))

  const { data: user } = await requireAuthSession(event)
  validateIsCompanyAdmin(user, body.id)

  const company = await getCompanyById(body.id)
  if (!company)
    throw createError({ status: 404, statusMessage: 'Empresa não encontrada' })

  // Service Layer
  await updateCompany(body)
})
