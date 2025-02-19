import type { tokens } from './tokens'

export type ThemeType = 'light' | 'dark'

export interface ThemeColors {
  background: {
    primary: string
    secondary: string
    tertiary: string
  }
  text: {
    primary: string
    secondary: string
    tertiary: string
    inverse: string
  }
  brand: typeof tokens.colors.brand
  semantic: typeof tokens.colors.semantic
  border: {
    default: string
    strong: string
  }
  disabled: {
    opacity: number
    backgroundColor: string
    textColor: string
  }
}

export interface Theme {
  type: ThemeType
  colors: ThemeColors
  spacing: typeof tokens.spacing
  borderRadius: typeof tokens.borderRadius
  typography: typeof tokens.typography
}
