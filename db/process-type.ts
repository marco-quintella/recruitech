import { pgEnum } from 'drizzle-orm/pg-core'

export const processTypeEnum = pgEnum('process_type', [
  'platform',
  'email',
  'link',
])

export type ProcessType = typeof processTypeEnum.enumValues[number]

export const ProcessTypeEnum = processTypeEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<ProcessType, ProcessType>
