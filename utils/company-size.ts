import { companySize } from '@prisma/client'
import { z } from 'zod'

export const companySizeOptions: { label: string, value: companySize }[] = [
  {
    label: '1 a 5',
    value: companySize.to5,
  },
  {
    label: '6 a 10',
    value: companySize.to10,
  },
  {
    label: '11 a 30',
    value: companySize.to30,
  },
  {
    label: '31 a 50',
    value: companySize.to50,
  },
  {
    label: '51 a 100',
    value: companySize.to100,
  },
  {
    label: 'Mais de 100',
    value: companySize.moreThan100,
  },
]

export const companySizeSchema = z.enum(Object.values(companySize) as [string])
