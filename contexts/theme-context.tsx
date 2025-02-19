import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { lightTheme, darkTheme } from '@/themes/themes'
import type { Theme, ThemeType } from '@/themes/types'

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setThemeMode: (mode: ThemeType | 'system') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = '@theme_mode'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeType | 'system'>('system')

  // Load saved theme on mount
  useEffect(() => {
    loadSavedTheme()
  }, [])

  // Handle system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setIsDark(colorScheme === 'dark')
      }
    })

    return () => subscription.remove()
  }, [themeMode])

  const loadSavedTheme = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (savedMode) {
        handleThemeModeChange(savedMode as ThemeType | 'system')
      } else {
        setIsDark(Appearance.getColorScheme() === 'dark')
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  const handleThemeModeChange = async (mode: ThemeType | 'system') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
      setThemeMode(mode)

      if (mode === 'system') {
        setIsDark(Appearance.getColorScheme() === 'dark')
      } else {
        setIsDark(mode === 'dark')
      }
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark'
    handleThemeModeChange(newMode)
  }

  const currentTheme: Theme = {
    ...(isDark ? darkTheme : lightTheme),
    type: isDark ? 'dark' : 'light',
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDark,
        toggleTheme,
        setThemeMode: handleThemeModeChange,
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
