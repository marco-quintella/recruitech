import { $Enums } from '@prisma/client'

export function parseContractType(t: $Enums.contractType) {
  switch (t) {
    case $Enums.contractType.full_time:
      return 'CLT'
    case $Enums.contractType.part_time:
      return 'Meio Período'
    case $Enums.contractType.internship:
      return 'Estágio'
    case $Enums.contractType.contractor:
      return 'PJ'
    default:
      return undefined
  }
}
