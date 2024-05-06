import { pgEnum } from 'drizzle-orm/pg-core'

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
