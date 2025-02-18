import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { ThemedText } from '../ThemedText'
import { BaseInput, BaseInputProps } from './inputs/BaseInput'

export interface ThemedInputProps
  extends Omit<BaseInputProps, 'containerStyle'> {
  variant?: 'default' | 'outlined'
  label?: string
  helperText?: string
  required?: boolean
  wrapperStyle?: ViewStyle
  error?: string
  disabled?: boolean
}

export const Input = ({
  variant = 'outlined',
  label,
  helperText,
  required,
  wrapperStyle,
  error,
  disabled,
  ...props
}: ThemedInputProps) => {
  const showError = typeof error === 'string' && error.length > 0

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label} {required && '*'}
        </ThemedText>
      )}

      <BaseInput
        variant={variant}
        error={error}
        disabled={disabled}
        containerStyle={styles.inputContainer}
        {...props}
      />

      {(showError || helperText) && (
        <ThemedText style={[styles.helperText, showError && styles.errorText]}>
          {(error as string) || helperText}
        </ThemedText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    marginVertical: 0,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  errorText: {
    color: '#EE9972',
  },
})
