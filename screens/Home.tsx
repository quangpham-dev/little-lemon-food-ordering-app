import React, { useCallback } from 'react'

import { ProductList } from '@/components/sections/ProductList'
import LoadingIndicator from '@/components/ui/LoadingIndicator'
import { ThemedText } from '@/components/ThemedText'
import { Button } from '@/components/ui/Button'
import { SafeAreaView } from '@/components/ui/SafeAreaView'
import { Box } from '@/components/ui/Box'

import { useProductFetch } from '@/hooks/use-product-fetch'
import { useProductFilter } from '@/hooks/use-product-filter'

export default function HomeScreen() {
  // Fetch products
  const {
    isLoading,
    isRefreshing,
    productsData,
    error,
    fetchInitialProducts,
    refreshProducts,
  } = useProductFetch()

  // Product filtering
  const {
    filteredProductsData,
    activeCategories,
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
  } = useProductFilter({ initialProducts: productsData })

  // Scroll handler (placeholder)
  const handleScroll = useCallback(() => {
    // Implement scroll handling if needed
  }, [])

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    resetFilters() // Reset search and category filters
  }, [resetFilters])

  // Early return for loading state
  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView>
        <Box backgroundColor="#495E57">
          <ThemedText type="title">Unable to Load Products</ThemedText>
          <ThemedText type="subtitle">
            {error || 'An unexpected error occurred'}
          </ThemedText>
          <Button onPress={fetchInitialProducts} title="Try Again" />
        </Box>
      </SafeAreaView>
    )
  }

  return (
    <ProductList
      isRefreshing={isRefreshing}
      productData={filteredProductsData}
      activeCategories={activeCategories}
      onScroll={handleScroll}
      onSearch={handleSearchChange}
      onRefreshPage={refreshProducts}
      onResetFilters={handleResetFilters}
      onCategoryChange={handleCategoryChange}
    />
  )
}
