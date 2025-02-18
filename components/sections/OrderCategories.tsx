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
      let newSelectedCategories: string[]

      if (activeCategories.includes(category)) {
        // Remove category if already selected
        newSelectedCategories = activeCategories.filter(
          selectedCategory => selectedCategory !== category,
        )
      } else {
        // Add category if not selected
        newSelectedCategories = [...activeCategories, category]
      }

      // Call the callback with updated categories
      onCategoryChange?.(newSelectedCategories)
    },
    [activeCategories, onCategoryChange],
  )

  return (
    <Flex direction="row" justify="between" style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            activeCategories.includes(category) &&
              styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategoryPress(category)}>
          <ThemedText
            style={[
              styles.categoryText,
              activeCategories.includes(category) &&
                styles.selectedCategoryText,
            ]}>
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
