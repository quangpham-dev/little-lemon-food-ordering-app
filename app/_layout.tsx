import { useEffect, useState } from 'react'
import { Redirect, Slot } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as ReactNavigationThemeProvider,
} from '@react-navigation/native'
import { SQLiteProvider } from 'expo-sqlite'

import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider, useTheme } from '@/contexts/theme-context'
import { useAuth } from '@/hooks/use-auth'
import { DATABASE_NAME } from '@/sqlite.config'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
    'Karla-Medium': require('../assets/fonts/Karla-Medium.ttf'),
    'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
    'Karla-ExtraBold': require('../assets/fonts/Karla-ExtraBold.ttf'),
    'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
    'MarkaziText-Medium': require('../assets/fonts/MarkaziText-Medium.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady, fontsLoaded])

  if (!appIsReady || !fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <SQLiteProvider databaseName={DATABASE_NAME}>
          <Slot />
          <NavigationContent />
        </SQLiteProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

function NavigationContent() {
  const { theme } = useTheme()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  return (
    <ReactNavigationThemeProvider
      value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? (
        <Redirect href="/(app)/home" />
      ) : (
        <Redirect href="/(auth)/onboarding" />
      )}
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ReactNavigationThemeProvider>
  )
}
