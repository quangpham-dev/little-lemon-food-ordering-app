import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'
import type { InputColorTokens } from '@/themes/colors'

export interface BaseInputProps
  extends Omit<React.ComponentProps<typeof TextInput>, 'style'> {
  variant?: 'default' | 'outlined' | 'filled'
  lightColor?: Partial<InputColorTokens>
  darkColor?: Partial<InputColorTokens>
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  error?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const BaseInput = ({
  variant = 'default',
  size = 'medium',
  lightColor,
  darkColor,
  containerStyle,
  inputStyle,
  error,
  disabled = false,
  ...props
}: BaseInputProps) => {
  const colors = useThemeColor(
    { light: lightColor, dark: darkColor },
    'input',
  ) as InputColorTokens
  const [isFocused, setIsFocused] = useState(false)

  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderRadius: 0,
        borderWidth: 0,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 8,
      },
      filled: {
        backgroundColor: colors.background,
        borderWidth: 0,
        borderRadius: 8,
      },
    }

    const sizes = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 18,
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 20,
      },
    }

    return {
      ...variants[variant],
      ...sizes[size],
      borderColor: error
        ? colors.error
        : isFocused
          ? colors.borderFocused
          : colors.border,
      opacity: disabled ? 0.6 : 1,
    }
  }

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          getVariantStyles(),
          {
            color: disabled ? colors.disabled : colors.text,
            width: '100%',
          },
          inputStyle,
        ]}
        placeholderTextColor={colors.placeholder}
        editable={!disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
