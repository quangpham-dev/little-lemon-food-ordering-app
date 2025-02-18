import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'

interface NotificationPreferencesProps {
  orderStatuses?: boolean
  passwordChanges?: boolean
  specialOffers?: boolean
  newsletter?: boolean
  onUpdateProfile: (key: string, value: boolean) => void
}

export const NotificationPreferences: React.FC<
  NotificationPreferencesProps
> = ({
  orderStatuses,
  passwordChanges,
  specialOffers,
  newsletter,
  onUpdateProfile,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Email notifications</Text>

      <NotificationCheckbox
        label="Order statuses"
        value={orderStatuses}
        onValueChange={value => onUpdateProfile('orderStatuses', value)}
      />

      <NotificationCheckbox
        label="Password changes"
        value={passwordChanges}
        onValueChange={value => onUpdateProfile('passwordChanges', value)}
      />

      <NotificationCheckbox
        label="Special offers"
        value={specialOffers}
        onValueChange={value => onUpdateProfile('specialOffers', value)}
      />

      <NotificationCheckbox
        label="Newsletter"
        value={newsletter}
        onValueChange={value => onUpdateProfile('newsletter', value)}
      />
    </>
  )
}

const NotificationCheckbox: React.FC<{
  label: string
  value?: boolean
  onValueChange: (value: boolean) => void
}> = ({ label, value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={styles.checkboxContainer}>
    <Checkbox style={styles.checkbox} value={value} color="#495E57" />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  checkboxContainer: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: '#495E57',
  },
})
