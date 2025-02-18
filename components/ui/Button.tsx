import React from 'react'
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { ThemedText } from '../ThemedText'

export interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary'
  title: string
  style?: StyleProp<ViewStyle & PressableProps>
}

export function Button({
  variant = 'primary',
  title,
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled}
      {...props}>
      <ThemedText
        style={[
          styles.text,
          variant === 'secondary' && styles.textSecondary,
          disabled && styles.textDisabled,
        ]}>
        {title}
      </ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F4CE14',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F4CE14',
  },
  buttonDisabled: {
    backgroundColor: '#EDEFEE',
    borderColor: '#EDEFEE',
  },
  text: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Karla-Bold',
  },
  textSecondary: {
    color: '#F4CE14',
  },
  textDisabled: {
    color: '#666',
  },
})
