import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

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
    <View>
      <Text style={styles.sectionTitle}>Personal information</Text>

      <Text style={styles.label}>First name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={value => onUpdateProfile('firstName', value)}
        placeholder="First Name"
      />

      <Text style={styles.label}>Last name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={value => onUpdateProfile('lastName', value)}
        placeholder="Last Name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={value => onUpdateProfile('email', value)}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={value => onUpdateProfile('phoneNumber', value)}
        placeholder="(217) 555-0113"
        keyboardType="phone-pad"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  label: {
    fontFamily: 'Karla-Medium',
    fontSize: 14,
    color: '#495E57',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDEFEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
})
