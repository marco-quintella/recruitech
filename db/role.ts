import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', [
  'system',
  'company_admin',
  'recruiter',
  'candidate',
])

export type Role = typeof roleEnum.enumValues[number]

export const RoleEnum = roleEnum.enumValues.reduce(
  (acc: Record<string, string>, value) => {
    acc[value] = value
    return acc
  },
  {},
) as Record<Role, Role>
