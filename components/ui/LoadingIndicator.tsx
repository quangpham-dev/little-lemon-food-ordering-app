import React from 'react'
import {
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
  ColorValue,
} from 'react-native'

interface LoadingIndicatorProps {
  /**
   * Size of the loading indicator
   * @default 'large'
   */
  size?: 'small' | 'large'

  /**
   * Color of the loading indicator
   * @default system default
   */
  color?: ColorValue

  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Whether the loading indicator is visible
   * @default true
   */
  isVisible?: boolean

  /**
   * Testable component ID for accessibility and testing
   */
  testID?: string
}

/**
 * A flexible and customizable loading indicator component
 * Follows React Native best practices for loading states
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color,
  containerStyle,
  isVisible = true,
  testID = 'loading-indicator',
}) => {
  if (!isVisible) {
    return null
  }

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}
      testID={testID}>
      <ActivityIndicator
        size={size}
        color={color}
        testID={`${testID}-spinner`}
      />
    </View>
  )
}

export default React.memo(LoadingIndicator)
