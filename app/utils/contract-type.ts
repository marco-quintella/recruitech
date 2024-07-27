import { z } from 'zod'
import { ContractTypeEnum } from '../../server/utils/enums'

export const contractTypeOptions: { label: string, value: ContractTypeEnum }[] = [
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

export const contractTypeSchema = z.enum(Object.values(ContractTypeEnum) as [string])
