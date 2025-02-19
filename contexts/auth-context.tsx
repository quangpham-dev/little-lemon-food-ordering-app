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
  updateUser: (userData: Partial<User>) => Promise<void>
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

  const updateUser = useCallback(
    async (userData: Partial<User>) => {
      try {
        // Merge new data with existing user data
        const updatedUser = user ? { ...user, ...userData } : userData

        // Save to AsyncStorage
        await AsyncStorage.setItem(
          StorageKeys.USER_INFO,
          JSON.stringify(updatedUser),
        )

        // Update user state
        setUser(updatedUser as User)
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    },
    [user],
  )

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
      updateUser,
    }),
    [isAuthenticated, isLoading, user, onboard, logout, updateUser],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
