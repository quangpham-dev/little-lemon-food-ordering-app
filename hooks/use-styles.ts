import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

// eslint-disable-next-line import/no-unresolved
import { useTheme } from '@/contexts/theme-context'

import type { Theme } from '@/themes/types'

export function useStyles<T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: Theme) => T,
) {
  const { theme } = useTheme()

  return useMemo(
    () => StyleSheet.create(styleFactory(theme)),
    [theme, styleFactory],
  )
}
