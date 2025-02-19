import { useState, useCallback, useMemo, useEffect } from 'react'
import { Alert } from 'react-native'
import debounce from 'lodash.debounce'

import type { Product } from '@/interfaces/product'
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

  // Validate products availability
  const validateProducts = useCallback(() => {
    if (initialProducts.length === 0) {
      console.warn('No products available for filtering')
      setFilteredProductsData([])
      return false
    }
    return true
  }, [initialProducts])

  // Update filtered products when initial products change
  useEffect(() => {
    console.log('Initial products updated:', initialProducts.length)
    setFilteredProductsData(initialProducts)
  }, [initialProducts])

  // Cleanup function for debounce
  useEffect(() => {
    return () => {
      debouncedFilter.cancel()
    }
  }, [])

  // Memoized filter function
  const filterProducts = useCallback(
    async (query: string, categories: string[]) => {
      if (!validateProducts()) return

      try {
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
    },
    [validateProducts],
  )

  // Memoized debounced filter
  const debouncedFilter = useMemo(
    () => debounce(filterProducts, 300),
    [filterProducts],
  )

  // Handle category changes
  const handleCategoryChange = useCallback(
    (selectedCategories: string[]) => {
      setActiveCategories(selectedCategories)

      if (!validateProducts()) return

      if (selectedCategories.length === 0) {
        setFilteredProductsData(initialProducts)
        return
      }

      debouncedFilter(searchQuery, selectedCategories)
    },
    [searchQuery, initialProducts, debouncedFilter, validateProducts],
  )

  // Handle search changes
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)

      if (!validateProducts()) return

      if (!query.trim()) {
        if (activeCategories.length > 0) {
          debouncedFilter('', activeCategories)
        } else {
          setFilteredProductsData(initialProducts)
        }
        return
      }

      debouncedFilter(query, activeCategories)
    },
    [activeCategories, initialProducts, debouncedFilter, validateProducts],
  )

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
