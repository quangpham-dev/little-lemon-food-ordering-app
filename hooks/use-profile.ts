import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

import { User } from '@/interfaces'
import { StorageKeys } from '@/constants'
import { useAuth } from './use-auth'

export const useProfile = (onSaveSuccess?: () => void) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
    avatar: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from AsyncStorage
  const loadUserData = useCallback(async () => {
    try {
      const storedUserData = await AsyncStorage.getItem(StorageKeys.USER_INFO)

      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData)
        setProfile({
          firstName: parsedUserData.firstName || user?.firstName || '',
          lastName: parsedUserData.lastName || user?.lastName || '',
          email: parsedUserData.email || user?.email || '',
          phoneNumber: parsedUserData.phoneNumber || '',
          orderStatuses: parsedUserData.orderStatuses ?? true,
          passwordChanges: parsedUserData.passwordChanges ?? true,
          specialOffers: parsedUserData.specialOffers ?? true,
          newsletter: parsedUserData.newsletter ?? true,
          avatar: parsedUserData.avatar || null,
        })
      } else if (user) {
        setProfile({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          orderStatuses: true,
          passwordChanges: true,
          specialOffers: true,
          newsletter: true,
          avatar: user.avatar || null,
        })
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Update profile field
  const updateProfile = useCallback((key: string, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }, [])

  // Pick image from library
  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permissions to make this work!',
        [{ text: 'OK' }],
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setProfile(prev => ({ ...prev, avatar: result.assets[0].uri }))
    }
  }, [])

  // Remove image
  const removeImage = useCallback(() => {
    setProfile(prev => ({ ...prev, avatar: null }))
  }, [])

  // Save profile
  const saveProfile = useCallback(async () => {
    try {
      // Validate required fields
      if (!profile.firstName || !profile.email) {
        Alert.alert(
          'Validation Error',
          'First Name and Email are required fields.',
        )
        return false
      }

      // Prepare user data for storage
      const userData: User = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber || '',
        avatar: profile.avatar,
        orderStatuses: profile.orderStatuses,
        passwordChanges: profile.passwordChanges,
        specialOffers: profile.specialOffers,
        newsletter: profile.newsletter,
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        StorageKeys.USER_INFO,
        JSON.stringify(userData),
      )

      // Optional callback on successful save
      onSaveSuccess?.()
      return true
    } catch (error) {
      console.error('Error saving profile:', error)
      Alert.alert(
        'Save Error',
        'There was a problem saving your profile. Please try again.',
      )
      return false
    }
  }, [profile, onSaveSuccess])

  return {
    profile,
    isLoading,
    updateProfile,
    pickImage,
    removeImage,
    saveProfile,
    setProfile,
  }
}
