import React from 'react'
import { Image as ImageNative, ImageProps, StyleSheet } from 'react-native'

export interface ThemedImageProps extends ImageProps {
  lightColor?: string
  darkColor?: string
  variant?: 'default' | 'rounded' | 'circle'
}

export const Image = ({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  ...props
}: ThemedImageProps) => {
  const variantStyles = {
    default: {},
    rounded: { borderRadius: 10 },
    circle: { borderRadius: 9999 },
  }

  return (
    <ImageNative
      style={[variantStyles[variant], styles.image, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
})
