import { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { User } from '@/interfaces'
import { StorageKeys } from '@/constants'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  onboard: (userData: User) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem(StorageKeys.USER_INFO)
      console.log('userData', userData)
      if (userData) {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onboard = useCallback(async (userData: User) => {
    try {
      await AsyncStorage.setItem(
        StorageKeys.USER_INFO,
        JSON.stringify(userData),
      )
      setUser(userData)
      setIsAuthenticated(true)
      router.replace('/home')
    } catch (error) {
      console.error('Error during onboarding:', error)
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(StorageKeys.USER_INFO)
      setUser(null)
      setIsAuthenticated(false)
      router.replace('/onboarding')
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      onboard,
      logout,
    }),
    [isAuthenticated, isLoading, user, onboard, logout],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
