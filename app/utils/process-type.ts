import { z } from 'zod'
import { ProcessTypeEnum } from '../../server/utils/enums'

export const processTypeOptions: { value: ProcessTypeEnum, label: string }[] = [
  {
    label: 'E-mail',
    value: ProcessTypeEnum.email,
  },
  {
    label: 'Link',
    value: ProcessTypeEnum.link,
  },
  {
    label: 'Plataforma',
    value: ProcessTypeEnum.platform,
  },
]

export const processTypeSchema = z.enum(Object.values(ProcessTypeEnum) as [string])
