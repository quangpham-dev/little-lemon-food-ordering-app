import React from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'

export interface BoxProps extends ViewProps {
  flexDirection?: 'row' | 'column'
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  padding?: number
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export function Box({
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  padding = 16,
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
          padding,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  )
}
