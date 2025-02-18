import React from 'react'
import { Box } from '../ui/Box'
import { ThemedText } from '../ThemedText'
import { Image } from '../ui/Image'
import { Product } from '@/interfaces/product'

interface ProductItemProps extends Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}
export function ProductItem({
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
      style={{
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        paddingVertical: 10,
      }}>
      <Box style={{ flex: 1, paddingRight: 10 }}>
        <ThemedText
          type="subtitle"
          style={{
            color: '#000000',
            fontFamily: 'Karla-Bold',
          }}>
          {name}
        </ThemedText>
        <ThemedText
          style={{
            paddingVertical: 5,
            color: '#495e57',
            fontFamily: 'Karla-Medium',
          }}>
          {description}
        </ThemedText>
        <ThemedText
          style={{
            color: '#EE9972',
            fontFamily: 'Karla-Medium',
          }}>
          ${price}
        </ThemedText>
      </Box>

      <Image
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
        source={{
          uri: image,
        }}
        accessible
        accessibilityLabel={`Image of ${name}`}
      />
    </Box>
  )
}
