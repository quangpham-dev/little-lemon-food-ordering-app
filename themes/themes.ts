import { tokens } from './tokens'
import type { Theme } from './types'

export const lightTheme: Theme = {
  type: 'light',
  colors: {
    brand: tokens.colors.brand,
    semantic: tokens.colors.semantic,
    background: {
      primary: tokens.colors.neutral.white,
      secondary: tokens.colors.neutral.grey[50],
      tertiary: tokens.colors.neutral.grey[100],
    },
    text: {
      primary: tokens.colors.neutral.grey[900],
      secondary: tokens.colors.neutral.grey[700],
      tertiary: tokens.colors.neutral.grey[500],
      inverse: tokens.colors.neutral.white,
    },
    border: {
      default: tokens.colors.neutral.grey[200],
      strong: tokens.colors.neutral.grey[300],
    },
    disabled: {
      opacity: 0.5,
      backgroundColor: tokens.colors.neutral.grey[200],
      textColor: tokens.colors.neutral.grey[500],
    },
  },
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  typography: tokens.typography,
}

export const darkTheme: Theme = {
  type: 'dark',
  colors: {
    brand: tokens.colors.brand,
    semantic: tokens.colors.semantic,
    background: {
      primary: tokens.colors.neutral.grey[900],
      secondary: tokens.colors.neutral.grey[800],
      tertiary: tokens.colors.neutral.grey[700],
    },
    text: {
      primary: tokens.colors.neutral.white,
      secondary: tokens.colors.neutral.grey[300],
      tertiary: tokens.colors.neutral.grey[400],
      inverse: tokens.colors.neutral.grey[900],
    },
    border: {
      default: tokens.colors.neutral.grey[700],
      strong: tokens.colors.neutral.grey[600],
    },
    disabled: {
      opacity: 0.5,
      backgroundColor: tokens.colors.neutral.grey[700],
      textColor: tokens.colors.neutral.grey[500],
    },
  },
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  typography: tokens.typography,
}
