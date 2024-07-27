import { z } from 'zod'
import type { ContractTypeEnum, ExperienceLevelEnum, RemoteTypeEnum } from '../../utils/enums'
import { ProcessTypeEnum } from '../../utils/enums'

interface CreateProcessBody {
  // Basic Info
  processType: ProcessTypeEnum
  title: string
  description: string
  contractType: ContractTypeEnum
  experienceLevel?: ExperienceLevelEnum
  salary0?: string
  salary1?: string
  email?: string
  link?: string
  remote?: RemoteTypeEnum

  // Realations
  tags?: string[]
  jobTitles?: string[]
  location?: {
    city?: string
    country?: string
    state?: string
  }
}

export default defineEventHandler(async (event) => {
  // Validation Layer
  const {
    contractType,
    description,
    email,
    experienceLevel,
    jobTitles,
    link,
    location,
    processType,
    remote,
    salary0,
    salary1,
    tags,
    title,
  } = await validateBody<CreateProcessBody>(event, z.object({
    contractType: contractTypeSchema,
    description: z.string(),
    email: z.string().optional(),
    experienceLevel: experienceLevelSchema.optional(),
    jobTitles: z.array(z.string().trim().uuid()).optional(),
    link: z.string().optional(),
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
    }).optional(),
    processType: processTypeSchema,
    remote: remoteTypeSchema,
    salary_0: integerSchema.nullish(),
    salary_1: integerSchema.nullish(),
    tags: z.array(z.string().trim().uuid()).optional(),
    title: z.string(),
  }))

  if (processType === ProcessTypeEnum.email && !email) {
    throw createError({
      status: 400,
      statusMessage: 'Um e-mail devem ser fornecidos',
    })
  }
  else if (processType === ProcessTypeEnum.link && !link) {
    throw createError({
      status: 400,
      statusMessage: 'Um link deve ser fornecido',
    })
  }

  const { data: user } = await requireAuthSession(event)
  validateIsCompanyMember(user)

  // Service Layer
  return await insertProcess({
    companyId: user.companyId!,
    contractType,
    description,
    email,
    experienceLevel,
    link,
    processType,
    remote,
    salary0: salary0 ? salary0.toString() : null,
    salary1: salary1 ? salary1.toString() : null,
    title,
    userId: user.id!,
  }, { jobTitles, location, tags })
})
