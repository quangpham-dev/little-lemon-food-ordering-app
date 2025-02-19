import { Text, type TextProps, StyleSheet } from 'react-native'

import { useThemeColor } from '@/hooks/use-theme-color'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'H1'
    | 'titleBlack'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'titleBlack' ? styles.titleBlack : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'H1' ? styles.H1 : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'MarkaziText-Medium',
    color: '#FFFFFF',
  },
  titleBlack: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    fontFamily: 'MarkaziText-Medium',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4',
  },
  H1: {
    fontSize: 56,
    fontFamily: 'MarkaziText-Medium',
    color: '#F4CE14',
    lineHeight: 56,
  },
})
