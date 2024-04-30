import { z } from 'zod'
import type { ProcessUpdate } from '../../../db/processes'
import { updateProcess } from '../../services/processes/updateProcess'

export default defineEventHandler(async (event) => {
  const body = await validateBody<ProcessUpdate>(event, z.object({
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
    link: z.string().url().optional(),
    processType: z.enum([
      ProcessTypeEnum.email,
      ProcessTypeEnum.link,
      ProcessTypeEnum.platform,
    ]).optional(),
    salary_0: numberSchema.optional(),
    salary_1: numberSchema.optional(),
    title: z.string().optional(),
    updatedAt: z.string().optional(),
  }))

  if (body.processType === ProcessTypeEnum.email && !body.email) {
    throw createError({
      status: 400,
      statusMessage: 'Um e-mail devem ser fornecidos',
    })
  }
  else if (body.processType === ProcessTypeEnum.link && !body.link) {
    throw createError({
      status: 400,
      statusMessage: 'Um link deve ser fornecido',
    })
  }

  const probableProcess = await getProcesses({
    id: body.id,
  })

  if (!probableProcess.data.length) {
    throw createError({
      message: 'Processo não encontrado',
      status: 404,
    })
  }

  const { data: user } = await requireAuthSession(event)
  validateIsCompanyMember(user, body.companyId)

  return await updateProcess(body)
})
