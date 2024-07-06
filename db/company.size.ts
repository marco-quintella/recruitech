import { pgEnum } from 'drizzle-orm/pg-core'

export const companySizeEnum = pgEnum('company_size', [
  '1to5',
  '6to10',
  '11to30',
  '31to50',
  '51to100',
  'moreThan100',
])

export type CompanySize = typeof companySizeEnum.enumValues[number]

export const CompanySizeEnum = companySizeEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<CompanySize, CompanySize>

export const companySizeOptions: { label: string, value: CompanySize }[] = [
  {
    label: '1 a 5',
    value: CompanySizeEnum['1to5'],
  },
  {
    label: '6 a 10',
    value: CompanySizeEnum['6to10'],
  },
  {
    label: '11 a 30',
    value: CompanySizeEnum['11to30'],
  },
  {
    label: '31 a 50',
    value: CompanySizeEnum['31to50'],
  },
  {
    label: '51 a 100',
    value: CompanySizeEnum['51to100'],
  },
  {
    label: 'Mais de 100',
    value: CompanySizeEnum.moreThan100,
  },
]

export const companySizeSchema = companySizeEnum.enumValues
