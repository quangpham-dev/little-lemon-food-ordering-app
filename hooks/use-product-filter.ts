import { useState, useCallback, useMemo, useEffect } from 'react'
import { Alert } from 'react-native'
import debounce from 'lodash.debounce'

import { Product } from '@/interfaces/product'
import { filterByQueryAndCategories } from '@/sqlite.config'

interface UseProductFilterProps {
  initialProducts: Product[]
}

export function useProductFilter({ initialProducts }: UseProductFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [filteredProductsData, setFilteredProductsData] = useState<Product[]>(
    [],
  )

  // Update filtered products when initial products change
  useEffect(() => {
    console.log('Initial products updated:', initialProducts.length)
    setFilteredProductsData(initialProducts)
  }, [initialProducts])

  // Memoized debounced filter function
  const debouncedFilter = useMemo(
    () =>
      debounce(async (query: string, categories: string[]) => {
        try {
          // If no initial products, skip filtering
          if (initialProducts.length === 0) {
            console.warn('No products available for filtering')
            setFilteredProductsData([])
            return
          }

          const filteredProducts = await filterByQueryAndCategories(
            query,
            categories,
          )

          console.log('Filtered products:', filteredProducts.length)

          setFilteredProductsData(filteredProducts)
        } catch (error) {
          console.error('Error filtering products:', error)
          Alert.alert('Filtering Error', 'Unable to filter products')
        }
      }, 300),
    [initialProducts],
  )

  // Handle category changes
  const handleCategoryChange = useCallback(
    (selectedCategories: string[]) => {
      setActiveCategories(selectedCategories)

      // If no initial products, skip filtering
      if (initialProducts.length === 0) {
        console.warn('No products available for category filtering')
        setFilteredProductsData([])
        return
      }

      // If no categories selected, show all products
      if (selectedCategories.length === 0) {
        setFilteredProductsData(initialProducts)
        return
      }

      // Trigger debounced filter
      debouncedFilter(searchQuery, selectedCategories)
    },
    [searchQuery, initialProducts, debouncedFilter],
  )

  // Handle search changes
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)

      // If no initial products, skip filtering
      if (initialProducts.length === 0) {
        console.warn('No products available for search filtering')
        setFilteredProductsData([])
        return
      }

      // If no query, show all products or filtered by categories
      if (!query.trim()) {
        if (activeCategories.length > 0) {
          // Filter by existing categories
          debouncedFilter('', activeCategories)
        } else {
          // Show all products
          setFilteredProductsData(initialProducts)
        }
        return
      }

      // Trigger debounced filter
      debouncedFilter(query, activeCategories)
    },
    [activeCategories, initialProducts, debouncedFilter],
  )

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setActiveCategories([])
    setFilteredProductsData(initialProducts)
  }, [initialProducts])

  return {
    searchQuery,
    activeCategories,
    filteredProductsData,
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
  }
}
