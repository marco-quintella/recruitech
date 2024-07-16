import { contractType } from '@prisma/client'
import { z } from 'zod'

export const contractTypeOptions: { label: string, value: contractType }[] = [
  {
    label: 'CLT',
    value: contractType.full_time,
  },
  {
    label: 'Meio Período',
    value: contractType.part_time,
  },
  {
    label: 'PJ',
    value: contractType.contractor,
  },
  {
    label: 'Estágio',
    value: contractType.internship,
  },
]

export const contractTypeSchema = z.enum(Object.values(contractType) as [string])
