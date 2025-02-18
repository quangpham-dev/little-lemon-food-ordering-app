import { ImageSourcePropType, Pressable, Platform } from 'react-native'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Images } from '@/assets'
import { Image } from '@/components/ui/Image'
import { useAuth } from '@/hooks/use-auth'

export default function AppLayout() {
  const { user } = useAuth()

  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Karla-Bold',
        },
        headerShadowVisible: false,
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
      }}>
      <Stack.Screen
        name="home"
        options={({ navigation }) => {
          return {
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle() {
              return (
                <Image
                  style={{
                    height: 40,
                    width: 120,
                    resizeMode: 'contain',
                  }}
                  source={Images.littleLemonLogo}
                  accessible
                  accessibilityLabel="Little Lemon Logo"
                />
              )
            },
            headerLeft: () => {
              return (
                navigation.canGoBack() && (
                  <Pressable
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="#495E57" />
                  </Pressable>
                )
              )
            },
            headerRight: () => (
              <Pressable
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                onPress={() => navigation.navigate('profile')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                  source={
                    user?.avatar
                      ? ({ uri: user?.avatar } as ImageSourcePropType)
                      : Images.avatar
                  }
                  accessible
                  accessibilityLabel="Profile"
                />
              </Pressable>
            ),
            headerBackVisible: false,
          }
        }}
      />
      <Stack.Screen
        name="profile"
        options={({ navigation }) => {
          return {
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle() {
              return (
                <Image
                  style={{
                    height: 40,
                    width: 120,
                    resizeMode: 'contain',
                  }}
                  source={Images.littleLemonLogo}
                  accessible
                  accessibilityLabel="Little Lemon Logo"
                />
              )
            },
            headerLeft: () => {
              return (
                navigation.canGoBack() && (
                  <Pressable
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="#495E57" />
                  </Pressable>
                )
              )
            },
            headerRight: () => (
              <Pressable
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                onPress={() => navigation.navigate('profile')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                  source={
                    user?.avatar
                      ? ({ uri: user?.avatar } as ImageSourcePropType)
                      : Images.avatar
                  }
                  accessible
                  accessibilityLabel="Profile"
                />
              </Pressable>
            ),
            headerBackVisible: false,
          }
        }}
      />
    </Stack>
  )
}
