import React, { useCallback } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Flex } from '../ui/Flex'
import { categories } from '@/constants'

interface OrderCategoriesProps {
  onCategoryChange?: (categories: string[]) => void
  activeCategories?: string[]
}

export function OrderCategories({
  onCategoryChange,
  activeCategories = [],
}: OrderCategoriesProps) {
  const handleCategoryPress = useCallback(
    (category: string) => {
      const newSelectedCategories = activeCategories.includes(category)
        ? activeCategories.filter(
            selectedCategory => selectedCategory !== category,
          )
        : [...activeCategories, category]

      onCategoryChange?.(newSelectedCategories)
    },
    [activeCategories, onCategoryChange],
  )

  const getCategoryStyle = useCallback(
    (category: string) => [
      styles.categoryButton,
      activeCategories.includes(category) && styles.selectedCategoryButton,
    ],
    [activeCategories],
  )

  const getCategoryTextStyle = useCallback(
    (category: string) => [
      styles.categoryText,
      activeCategories.includes(category) && styles.selectedCategoryText,
    ],
    [activeCategories],
  )

  return (
    <Flex direction="row" justify="between" style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={getCategoryStyle(category)}
          onPress={() => handleCategoryPress(category)}>
          <ThemedText style={getCategoryTextStyle(category)}>
            {category}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </Flex>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
  },
  categoryButton: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#495E57',
  },
  selectedCategoryButton: {
    backgroundColor: '#495E57',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: 'white',
  },
})
