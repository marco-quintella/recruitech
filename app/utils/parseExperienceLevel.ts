import { ExperienceLevelEnum } from '../../server/utils/enums'

export function parseExperienceLevel(e: ExperienceLevelEnum) {
  switch (e) {
    case ExperienceLevelEnum.entry:
      return 'Junior'
    case ExperienceLevelEnum.intermediate:
      return 'Pleno'
    case ExperienceLevelEnum.senior:
      return 'Senior'
    default:
      return undefined
  }
}
