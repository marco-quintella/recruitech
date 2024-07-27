import type { Prisma, processes } from '@prisma/client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const {
    jobTitles,
    location,
    tags,
    ...process
  } = await validateBody<Partial<processes> & {
    tags?: string[]
    jobTitles?: string[]
    location?: Prisma.locationsCreateInput
  }>(event, z.object({
    companyId: z.string().trim().uuid().optional(),
    contractType: z.enum([
      ContractTypeEnum.contractor,
      ContractTypeEnum.full_time,
      ContractTypeEnum.internship,
      ContractTypeEnum.part_time,
    ]).optional(),
    description: z.string().trim().optional(),
    email: z.string().trim().email().optional(),
    experienceLevel: z.enum([
      ExperienceLevelEnum.entry,
      ExperienceLevelEnum.intermediate,
      ExperienceLevelEnum.senior,
    ]).optional(),
    id: z.string().trim().uuid(),
    jobTitles: z.array(z.string().trim().uuid()).optional(),
    link: z.string().url().optional(),
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
    }).optional(),
    processType: processTypeSchema.optional(),
    remote: remoteTypeSchema.optional(),
    salary_0: numberSchema.optional(),
    salary_1: numberSchema.optional(),
    tags: z.array(z.string().trim().uuid()).optional(),
    title: z.string().optional(),
    updatedAt: z.string().optional(),
  }))

  if (process.processType === ProcessTypeEnum.email && !process.email) {
    throw createError({
      status: 400,
      statusMessage: 'Um e-mail devem ser fornecidos',
    })
  }
  else if (process.processType === ProcessTypeEnum.link && !process.link) {
    throw createError({
      status: 400,
      statusMessage: 'Um link deve ser fornecido',
    })
  }

  const probableProcess = await getProcesses({ filters: {
    id: process.id?.toString(),
  } })

  if (!probableProcess.data.length) {
    throw createError({
      message: 'Processo não encontrado',
      status: 404,
    })
  }

  const { data: user } = await requireAuthSession(event)
  validateIsCompanyMember(user, process.companyId)

  return await updateProcess(process, {
    jobTitles,
    location,
    tags,
  })
})
