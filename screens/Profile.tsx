import React from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'

import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/hooks/use-profile'

import { AvatarSection } from '@/components/profile/AvatarSection'
import { PersonalInfoSection } from '@/components/profile/PersonalInfoSection'
import { NotificationPreferences } from '@/components/profile/NotificationPreferences'
import { SafeAreaView } from '@/components/ui/SafeAreaView'
import { Button } from '@/components/ui/Button'
import { Box } from '@/components/ui/Box'

export default function ProfileScreen() {
  const router = useRouter()
  const { logout } = useAuth()
  const {
    profile,
    isLoading,
    updateProfile,
    pickImage,
    removeImage,
    saveProfile,
  } = useProfile(() => router.back())

  const handleSave = async () => {
    const success = await saveProfile()
    if (success) {
      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully saved.',
        [{ text: 'OK' }],
      )
    }
  }

  const handleDiscard = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard all changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ],
    )
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.content}>
        <AvatarSection
          avatar={profile.avatar}
          onPickImage={pickImage}
          onRemoveImage={removeImage}
        />

        <PersonalInfoSection
          firstName={profile.firstName}
          lastName={profile.lastName}
          email={profile.email}
          phoneNumber={profile.phoneNumber}
          onUpdateProfile={(key, value) => updateProfile(key, value)}
        />

        <NotificationPreferences
          orderStatuses={profile.orderStatuses}
          passwordChanges={profile.passwordChanges}
          specialOffers={profile.specialOffers}
          newsletter={profile.newsletter}
          onUpdateProfile={(key, value) => updateProfile(key, value)}
        />

        <Button
          variant="secondary"
          title="Log out"
          onPress={logout}
          style={{ marginTop: 24 }}
        />

        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={32}
          gap={16}>
          <Button
            variant="outline"
            title="Discard"
            onPress={handleDiscard}
            style={{
              flex: 1,
            }}
          />
          <Button
            variant="primary"
            title="Save Changes"
            onPress={handleSave}
            style={{
              flex: 1,
            }}
          />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
})
