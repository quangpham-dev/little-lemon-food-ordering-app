import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Box } from '../ui/Box'
import { ThemedText } from '../ThemedText'
import { Image } from '../ui/Image'
import type { Product } from '@/interfaces/product'

interface ProductItemProps extends Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: '#000000',
    fontFamily: 'Karla-Bold',
  },
  description: {
    paddingVertical: 5,
    color: '#495e57',
    fontFamily: 'Karla-Medium',
  },
  price: {
    color: '#EE9972',
    fontFamily: 'Karla-Medium',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})

export const ProductItem = memo(function ProductItem({
  name,
  description,
  price,
  image,
}: ProductItemProps) {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={styles.container}>
      <Box style={styles.content}>
        <ThemedText type="subtitle" style={styles.title}>
          {name}
        </ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
        <ThemedText style={styles.price}>${price}</ThemedText>
      </Box>

      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: image }}
        accessible
        accessibilityLabel={`Image of ${name}`}
      />
    </Box>
  )
})
