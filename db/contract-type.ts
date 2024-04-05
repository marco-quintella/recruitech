import { pgEnum } from 'drizzle-orm/pg-core'

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
