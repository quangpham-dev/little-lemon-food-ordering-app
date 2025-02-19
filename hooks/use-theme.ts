import { useCallback } from 'react'
import { useColorScheme } from 'react-native'
import { useTheme as useThemeContext } from '@/contexts/theme-context'
import type { ThemeType } from '@/themes/types'

export function useAppTheme() {
  const { theme, setThemeMode, isDark } = useThemeContext()
  const systemTheme = useColorScheme()

  const setTheme = useCallback(
    (mode: ThemeType | 'system') => {
      setThemeMode(mode)
    },
    [setThemeMode],
  )

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  return {
    theme,
    isDark,
    systemTheme,
    setTheme,
    toggleTheme,
  }
}
