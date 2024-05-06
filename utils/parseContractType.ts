import type { ContractType } from '../db/contract-type'

export function parseContractType(t: ContractType) {
  switch (t) {
    case ContractTypeEnum.full_time:
      return 'CLT'
    case ContractTypeEnum.part_time:
      return 'Meio Período'
    case ContractTypeEnum.internship:
      return 'Estágio'
    case ContractTypeEnum.contractor:
      return 'PJ'
    default:
      return undefined
  }
}
