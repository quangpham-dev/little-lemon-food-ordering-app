import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from '@/components/ui/Image'
import { Images } from '@/assets'

interface AvatarSectionProps {
  avatar: string | null
  onPickImage: () => void
  onRemoveImage: () => void
}

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatar,
  onPickImage,
  onRemoveImage,
}) => {
  return (
    <View>
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.avatarContainer}>
        <Pressable onPress={onPickImage}>
          <Image
            resizeMode="cover"
            source={avatar ? { uri: avatar } : Images.avatar}
            style={styles.avatar}
          />
        </Pressable>
        <View style={styles.avatarButtons}>
          <Pressable style={styles.changeButton} onPress={onPickImage}>
            <Text style={styles.changeButtonText}>Change</Text>
          </Pressable>
          <Pressable style={styles.removeButton} onPress={onRemoveImage}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Karla-Medium',
    fontSize: 14,
    color: '#495E57',
    marginBottom: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarButtons: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  changeButton: {
    backgroundColor: '#495E57',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  changeButtonText: {
    color: '#fff',
    fontFamily: 'Karla-Medium',
  },
  removeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#495E57',
  },
  removeButtonText: {
    color: '#495E57',
    fontFamily: 'Karla-Medium',
  },
})
