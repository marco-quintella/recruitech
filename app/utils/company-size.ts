import { z } from 'zod'
import { CompanySizeEnum } from '../../server/utils/enums'

export const companySizeOptions: { label: string, value: CompanySizeEnum }[] = [
  {
    label: '1 a 5',
    value: CompanySizeEnum.to5,
  },
  {
    label: '6 a 10',
    value: CompanySizeEnum.to10,
  },
  {
    label: '11 a 30',
    value: CompanySizeEnum.to30,
  },
  {
    label: '31 a 50',
    value: CompanySizeEnum.to50,
  },
  {
    label: '51 a 100',
    value: CompanySizeEnum.to100,
  },
  {
    label: 'Mais de 100',
    value: CompanySizeEnum.moreThan100,
  },
]

export const companySizeSchema = z.enum(Object.values(CompanySizeEnum) as [string])
