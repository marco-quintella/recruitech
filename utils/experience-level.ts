import { experienceLevel } from '@prisma/client'
import { z } from 'zod'

export const experienceLevelOptions: { label: string, value: experienceLevel }[] = [
  { label: 'Junior', value: 'entry' },
  { label: 'Pleno', value: 'intermediate' },
  { label: 'Senior', value: 'senior' },
]

export const experienceLevelSchema = z.enum(Object.values(experienceLevel) as [string])
