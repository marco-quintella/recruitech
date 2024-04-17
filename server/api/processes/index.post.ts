import { z } from 'zod'

export default defineEventHandler<{
  body: {
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
  }
}>(async (event) => {
  // Validation Layer
  const {
    contractType,
    description,
    email,
    link,
    processType,
    salary_0,
    salary_1,
    title,
    experienceLevel,
  } = await validateBody(event, z.object({
    processType: z.enum([
      ProcessTypeEnum.email,
      ProcessTypeEnum.link,
      ProcessTypeEnum.platform,
    ]),
    title: z.string(),
    description: z.string(),
    contractType: z.enum([
      ContractTypeEnum.contractor,
      ContractTypeEnum.full_time,
      ContractTypeEnum.internship,
      ContractTypeEnum.part_time,
    ]),
    experienceLevel: z.enum([
      ExperienceLevelEnum.entry,
      ExperienceLevelEnum.intermediate,
      ExperienceLevelEnum.senior,
    ]).optional(),
    salary_0: z.number().optional(),
    salary_1: z.number().optional(),
    email: z.string().optional(),
    link: z.string().optional(),
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
    userId: user.id!,
    contractType,
    description,
    processType,
    title,
    experienceLevel,
    salary_0: salary_0 ? salary_0.toString() : null,
    salary_1: salary_1 ? salary_1.toString() : null,
    email,
    link,
  })
})
