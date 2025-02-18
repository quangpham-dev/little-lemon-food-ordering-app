import { useCallback } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { useAuth } from '@/hooks/use-auth'
import { Images } from '@/assets'
import { ThemedView } from '@/components/ThemedView'
import { Image } from '@/components/ui/Image'
import { SafeAreaView } from '@/components/ui/SafeAreaView'
import { Hero } from '@/components/sections/Hero'
import { OnboardingForm } from '@/components/forms/OnboardingForm'
import { useForm } from '@/hooks/use-form'
import { User } from '@/interfaces'

export default function OnboardingScreen() {
  const { onboard } = useAuth()

  const validate = useCallback((name: 'name' | 'email', value: string) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return 'Invalid email address'
        return undefined
    }
  }, [])

  const { fields, handleChange, handleBlur, isValid, getValues } = useForm({
    initialValues: { name: '', email: '' },
    validate,
  })

  const handleSubmit = useCallback(() => {
    if (isValid()) {
      const values = getValues()
      onboard({
        firstName: values.name,
        email: values.email,
      } as User)
    }
  }, [isValid, getValues, onboard])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false}>
          <ThemedView style={styles.header}>
            <Image
              style={styles.logo}
              source={Images.littleLemonLogo}
              accessible
              accessibilityLabel="Little Lemon Logo"
            />
          </ThemedView>

          <Hero type="secondary" />

          <OnboardingForm
            fields={fields}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  logo: {
    height: 50,
    width: 150,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
})
