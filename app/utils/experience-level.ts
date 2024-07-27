import { z } from 'zod'
import { ExperienceLevelEnum } from '../../server/utils/enums'

export const experienceLevelOptions: { label: string, value: ExperienceLevelEnum }[] = [
  { label: 'Junior', value: ExperienceLevelEnum.entry },
  { label: 'Pleno', value: ExperienceLevelEnum.intermediate },
  { label: 'Senior', value: ExperienceLevelEnum.senior },
]

export const experienceLevelSchema = z.enum(Object.values(ExperienceLevelEnum) as [string])
