export function validateUrl(s: string) {
  try {
    const _ = new URL(s)
    return true
  }
  catch (e: any) {
    return false
  }
}

export function urlRule(s: string) {
  return validateUrl(s) ? true : 'URL Inválida'
}

export function urlRuleNullish(s: string | undefined | null) {
  return s ? urlRule(s) : true
}
