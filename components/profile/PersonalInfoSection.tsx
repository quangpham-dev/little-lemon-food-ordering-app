import React from 'react'

import { ThemedText } from '@/components/ThemedText'
import { Input } from '../ui/Input'

interface PersonalInfoSectionProps {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  onUpdateProfile: (key: string, value: string) => void
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  onUpdateProfile,
}) => {
  return (
    <>
      <ThemedText type="titleBlack" style={{ marginBottom: 16, marginTop: 8 }}>
        Personal information
      </ThemedText>

      <Input
        label="First name"
        value={firstName}
        onChangeText={value => onUpdateProfile('firstName', value)}
        placeholder="First Name"
      />

      <Input
        label="Last name"
        value={lastName}
        onChangeText={value => onUpdateProfile('lastName', value)}
        placeholder="Last Name"
      />

      <Input
        label="Email"
        value={email}
        onChangeText={value => onUpdateProfile('email', value)}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Input
        label="Phone number"
        value={phoneNumber}
        onChangeText={value => onUpdateProfile('phoneNumber', value)}
        placeholder="(217) 555-0113"
        keyboardType="phone-pad"
      />
    </>
  )
}
