import { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import type { User } from '@/interfaces'
import { StorageKeys } from '@/constants'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  error: string | null
  onboard: (userData: User) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      const userData = await AsyncStorage.getItem(StorageKeys.USER_INFO)

      if (!userData) {
        setIsAuthenticated(false)
        return
      }

      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsAuthenticated(false)
      setError(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = useCallback(() => {
    setError('')
  }, [])

  const handleError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error)
    setError(errorMessage)
  }, [])

  const onboard = useCallback(
    async (userData: User) => {
      try {
        setIsLoading(true)
        await AsyncStorage.setItem(
          StorageKeys.USER_INFO,
          JSON.stringify(userData),
        )
        setUser(userData)
        setIsAuthenticated(true)
        router.replace('/home')
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleError],
  )

  const updateUser = useCallback(
    async (userData: Partial<User>) => {
      try {
        setIsLoading(true)
        const updatedUser = user ? { ...user, ...userData } : userData

        await AsyncStorage.setItem(
          StorageKeys.USER_INFO,
          JSON.stringify(updatedUser),
        )

        setUser(updatedUser as User)
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [user, handleError],
  )

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await AsyncStorage.removeItem(StorageKeys.USER_INFO)
      setUser(null)
      setIsAuthenticated(false)
      router.replace('/onboarding')
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  const contextValue = useMemo(
    () => ({
      user,
      error,
      isLoading,
      isAuthenticated,
      onboard,
      logout,
      updateUser,
      clearError,
    }),
    [
      isAuthenticated,
      isLoading,
      user,
      error,
      onboard,
      logout,
      updateUser,
      clearError,
    ],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
