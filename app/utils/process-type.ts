import { processType } from '@prisma/client'
import { z } from 'zod'

export const processTypeOptions: { value: processType, label: string }[] = [
  {
    label: 'E-mail',
    value: processType.email,
  },
  {
    label: 'Link',
    value: processType.link,
  },
  {
    label: 'Plataforma',
    value: processType.platform,
  },
]

export const processTypeSchema = z.enum(Object.values(processType) as [string])
