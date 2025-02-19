import type { ReactNode } from 'react'
import {
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

interface BoxProps extends ViewProps {
  flexDirection?: ViewStyle['flexDirection']
  justifyContent?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['alignItems']
  flex?: ViewStyle['flex']
  margin?: ViewStyle['margin']
  marginTop?: ViewStyle['marginTop']
  marginBottom?: ViewStyle['marginBottom']
  marginLeft?: ViewStyle['marginLeft']
  marginRight?: ViewStyle['marginRight']
  marginVertical?: ViewStyle['marginVertical']
  marginHorizontal?: ViewStyle['marginHorizontal']
  padding?: ViewStyle['padding']
  paddingTop?: ViewStyle['paddingTop']
  paddingBottom?: ViewStyle['paddingBottom']
  paddingLeft?: ViewStyle['paddingLeft']
  paddingRight?: ViewStyle['paddingRight']
  paddingVertical?: ViewStyle['paddingVertical']
  paddingHorizontal?: ViewStyle['paddingHorizontal']
  backgroundColor?: ViewStyle['backgroundColor']
  borderWidth?: ViewStyle['borderWidth']
  borderColor?: ViewStyle['borderColor']
  borderBottomWidth?: ViewStyle['borderBottomWidth']
  borderBottomColor?: ViewStyle['borderBottomColor']
  borderTopWidth?: ViewStyle['borderTopWidth']
  borderTopColor?: ViewStyle['borderTopColor']
  borderLeftWidth?: ViewStyle['borderLeftWidth']
  borderLeftColor?: ViewStyle['borderLeftColor']
  borderRightWidth?: ViewStyle['borderRightWidth']
  borderRightColor?: ViewStyle['borderRightColor']
  borderRadius?: ViewStyle['borderRadius']
  gap?: ViewStyle['gap']
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export function Box({
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  padding = 16,
  flex,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingVertical,
  paddingHorizontal,
  backgroundColor,
  gap,
  style,
  children,
  ...props
}: BoxProps) {
  return (
    <View
      style={[
        {
          flexDirection,
          justifyContent,
          alignItems,
          flex,
          margin,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          marginVertical,
          marginHorizontal,
          padding,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          paddingVertical,
          paddingHorizontal,
          backgroundColor,
          gap,
          ...props,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  )
}
