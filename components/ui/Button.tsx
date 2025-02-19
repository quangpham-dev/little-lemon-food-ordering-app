import React from 'react'
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '@/contexts/theme-context'
import { useStyles } from '@/hooks/use-styles'
import type { Theme } from '@/themes/types'
import { ThemedText } from '../ThemedText'
import LoadingIndicator from './LoadingIndicator'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant
  title: string
  size?: 'small' | 'medium' | 'large'
  style?: StyleProp<ViewStyle & PressableProps>
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'medium',
  title,
  style,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  // Get theme from useTheme hook
  const { theme } = useTheme()
  const styles = useStyles((theme: Theme) => ({
    button: {
      padding: getSizePadding(size, theme),
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...getVariantStyles(variant, theme),
    },
    text: {
      fontSize: getSizeFontSize(size),
      fontFamily: 'Karla-Bold',
      ...getTextStyles(variant, theme),
    },
    disabled: {
      opacity: 0.5,
      backgroundColor: theme.colors.disabled.backgroundColor,
    },
  }))

  return (
    <Pressable
      style={[styles.button, (disabled || isLoading) && styles.disabled, style]}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <LoadingIndicator
          color={getLoadingColor(variant, theme)}
          size="small"
          containerStyle={{ marginRight: 8 }}
        />
      ) : null}
      <ThemedText style={styles.text}>{title}</ThemedText>
    </Pressable>
  )
}

function getVariantStyles(variant: ButtonVariant, theme: Theme): ViewStyle {
  const variants = {
    primary: {
      backgroundColor: theme.colors.brand.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: theme.colors.brand.secondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.brand.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    danger: {
      backgroundColor: theme.colors.semantic.error,
      borderWidth: 0,
    },
    success: {
      backgroundColor: theme.colors.semantic.success,
      borderWidth: 0,
    },
  }

  return variants[variant]
}

function getTextStyles(variant: ButtonVariant, theme: Theme) {
  const textStyles = {
    primary: {
      color: theme.colors.text.inverse,
    },
    secondary: {
      color: theme.colors.text.primary,
    },
    outline: {
      color: theme.colors.brand.primary,
    },
    ghost: {
      color: theme.colors.brand.primary,
    },
    danger: {
      color: theme.colors.text.inverse,
    },
    success: {
      color: theme.colors.text.inverse,
    },
  }

  return textStyles[variant]
}

function getSizePadding(size: ButtonProps['size'], theme: Theme) {
  const sizes = {
    small: theme.spacing.sm,
    medium: theme.spacing.md,
    large: theme.spacing.lg,
  }

  return size ? sizes[size] : sizes.medium
}

function getSizeFontSize(size: ButtonProps['size']) {
  const sizes = {
    small: 14,
    medium: 16,
    large: 18,
  }

  return size ? sizes[size] : sizes.medium
}

function getLoadingColor(variant: ButtonVariant, theme: Theme) {
  const colors = {
    primary: theme.colors.text.inverse,
    secondary: theme.colors.text.primary,
    outline: theme.colors.brand.primary,
    ghost: theme.colors.brand.primary,
    danger: theme.colors.text.inverse,
    success: theme.colors.text.inverse,
  }

  return colors[variant]
}
