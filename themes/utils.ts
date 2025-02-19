import type { Theme } from './types'

export function getThemeValue<T>(theme: Theme, path: string): T {
  return path.split('.').reduce((obj, key) => obj[key], theme as any)
}

export function createThemedStyle<T extends object>(
  theme: Theme,
  styleFactory: (theme: Theme) => T,
): T {
  return styleFactory(theme)
}
