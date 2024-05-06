import { z } from 'zod'

interface CreateProcessBody {
  // Basic Info
  processType: ProcessType
  title: string
  description: string
  contractType: ContractType
  experienceLevel?: ExperienceLevel
  salary_0?: string
  salary_1?: string
  email?: string
  link?: string
  tags?: string[]
}

export default defineEventHandler(async (event) => {
  // Validation Layer
  const {
    contractType,
    description,
    email,
    experienceLevel,
    link,
    processType,
    salary_0,
    salary_1,
    tags,
    title,
  } = await validateBody<CreateProcessBody>(event, z.object({
    contractType: z.enum([
      ContractTypeEnum.contractor,
      ContractTypeEnum.full_time,
      ContractTypeEnum.internship,
      ContractTypeEnum.part_time,
    ]),
    description: z.string(),
    email: z.string().optional(),
    experienceLevel: z.enum([
      ExperienceLevelEnum.entry,
      ExperienceLevelEnum.intermediate,
      ExperienceLevelEnum.senior,
    ]).optional(),
    link: z.string().optional(),
    processType: z.enum([
      ProcessTypeEnum.email,
      ProcessTypeEnum.link,
      ProcessTypeEnum.platform,
    ]),
    salary_0: integerSchema.optional(),
    salary_1: integerSchema.optional(),
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
    salary_0: salary_0 ? salary_0.toString() : null,
    salary_1: salary_1 ? salary_1.toString() : null,
    title,
    userId: user.id!,
  }, { tags })
})
