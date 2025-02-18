import { useThemeColor } from '@/hooks/use-theme-color'
import React from 'react'
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const SafeAreaView = ({
  children,
  style,
  lightColor,
  darkColor,
}: {
  children: React.ReactNode
  style?: ViewStyle
  lightColor?: string
  darkColor?: string
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )
  const inset = useSafeAreaInsets()

  return (
    <RNSafeAreaView
      style={[
        styles.container,
        { marginTop: inset.top },
        { backgroundColor },
        style,
      ]}>
      {children}
    </RNSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
