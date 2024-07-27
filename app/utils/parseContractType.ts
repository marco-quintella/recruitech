import { ContractTypeEnum } from '../../server/utils/enums'

export function parseContractType(t: ContractTypeEnum) {
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
