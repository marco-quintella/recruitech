import { experienceLevel } from '@prisma/client'

export function parseExperienceLevel(e: experienceLevel) {
  switch (e) {
    case experienceLevel.entry:
      return 'Junior'
    case experienceLevel.intermediate:
      return 'Pleno'
    case experienceLevel.senior:
      return 'Senior'
    default:
      return undefined
  }
}
