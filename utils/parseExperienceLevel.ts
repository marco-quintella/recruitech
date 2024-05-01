export function parseExperienceLevel(e: ExperienceLevel) {
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
