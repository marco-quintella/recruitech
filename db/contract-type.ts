import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const contractTypeEnum = pgEnum('contract_type', [
  'full_time',
  'part_time',
  'contractor',
  'internship',
])

export type ContractType = typeof contractTypeEnum.enumValues[number]

export const ContractTypeEnum = contractTypeEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<ContractType, ContractType>

export const contractTypeOptions: { label: string, value: ContractType }[] = [
  {
    label: 'CLT',
    value: ContractTypeEnum.full_time,
  },
  {
    label: 'Meio Período',
    value: ContractTypeEnum.part_time,
  },
  {
    label: 'PJ',
    value: ContractTypeEnum.contractor,
  },
  {
    label: 'Estágio',
    value: ContractTypeEnum.internship,
  },
]

export const contractTypeSchema = z.enum(contractTypeEnum.enumValues)
