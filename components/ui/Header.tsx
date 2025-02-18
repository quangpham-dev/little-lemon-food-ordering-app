import React from 'react'
import { View, Pressable, StyleSheet, ImageSourcePropType } from 'react-native'
import { router } from 'expo-router'

import { Image } from '@/components/ui/Image'
import { Images } from '@/assets'
import RenderWith from '../render-with'

interface HeaderProps {
  logo: ImageSourcePropType
  onProfilePress?: () => void
  avatar?: ImageSourcePropType
}

export function Header({
  logo,
  onProfilePress,
  avatar = Images.avatar,
}: HeaderProps) {
  const handleProfilePress = () => {
    onProfilePress ? onProfilePress() : router.navigate('/profile')
  }

  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={logo}
        accessible
        accessibilityLabel="Little Lemon Logo"
      />
      <View style={styles.profileContainer}>
        <RenderWith isTrue={!!avatar}>
          <Pressable onPress={handleProfilePress} style={styles.profileButton}>
            <Image
              style={styles.profileImage}
              source={avatar}
              accessible
              accessibilityLabel="Profile"
            />
          </Pressable>
        </RenderWith>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
  },
  profileContainer: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})
