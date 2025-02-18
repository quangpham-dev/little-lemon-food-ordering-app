import Animated from 'react-native-reanimated'
import { type ViewProps } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'

export type AnimatedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function AnimatedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: AnimatedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />
}
