import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const experienceLevelEnum = pgEnum('experience_level', [
  'entry',
  'intermediate',
  'senior',
])

export type ExperienceLevel = typeof experienceLevelEnum.enumValues[number]

export const ExperienceLevelEnum = experienceLevelEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<ExperienceLevel, ExperienceLevel>

export const experienceLevelOptions: { label: string, value: ExperienceLevel }[] = [
  { label: 'Junior', value: 'entry' },
  { label: 'Pleno', value: 'intermediate' },
  { label: 'Senior', value: 'senior' },
]

export const experienceLevelSchema = z.enum(Object.values(ExperienceLevelEnum) as [string])
