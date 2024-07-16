export function isDefined<T>(value: T | null | undefined | void): value is T {
  return value !== undefined && value !== null && value !== void 0
}
