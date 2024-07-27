import type { companySize, contractType, experienceLevel, processType, remoteType, role } from '@prisma/client'

export const ContractTypeEnum: { [k in contractType]: k } = {
  contractor: 'contractor',
  full_time: 'full_time',
  internship: 'internship',
  part_time: 'part_time',
}

// eslint-disable-next-line ts/no-redeclare
export type ContractTypeEnum = contractType

export const ExperienceLevelEnum: { [k in experienceLevel]: k } = {
  entry: 'entry',
  intermediate: 'intermediate',
  senior: 'senior',
}

// eslint-disable-next-line ts/no-redeclare
export type ExperienceLevelEnum = experienceLevel

export const RemoteTypeEnum: { [k in remoteType]: k } = {
  full_remote: 'full_remote',
  hybrid: 'hybrid',
  on_site: 'on_site',
}

// eslint-disable-next-line ts/no-redeclare
export type RemoteTypeEnum = remoteType

export const ProcessTypeEnum: { [k in processType]: k } = {
  email: 'email',
  link: 'link',
  platform: 'platform',
}

// eslint-disable-next-line ts/no-redeclare
export type ProcessTypeEnum = processType

export const CompanySizeEnum: { [k in companySize]: k } = {
  moreThan100: 'moreThan100',
  to10: 'to10',
  to100: 'to100',
  to30: 'to30',
  to5: 'to5',
  to50: 'to50',
}

// eslint-disable-next-line ts/no-redeclare
export type CompanySizeEnum = companySize

export const RoleEnum: { [k in role]: k } = {
  candidate: 'candidate',
  company_admin: 'company_admin',
  recruiter: 'recruiter',
  system: 'system',
}

// eslint-disable-next-line ts/no-redeclare
export type RoleEnum = role
