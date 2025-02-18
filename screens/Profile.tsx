import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'

import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/hooks/use-profile'

import { AvatarSection } from '@/components/profile/AvatarSection'
import { PersonalInfoSection } from '@/components/profile/PersonalInfoSection'
import { NotificationPreferences } from '@/components/profile/NotificationPreferences'
import { SafeAreaView } from '@/components/ui/SafeAreaView'

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

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.discardButton]}
            onPress={handleDiscard}>
            <Text style={styles.discardButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  logoutText: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
    color: '#495E57',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  discardButton: {
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#495E57',
  },
  discardButtonText: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
    color: '#495E57',
  },
  saveButton: {
    backgroundColor: '#495E57',
    marginLeft: 8,
  },
  saveButtonText: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
    color: '#fff',
  },
})
