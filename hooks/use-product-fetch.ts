import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Alert } from 'react-native'

import { Product } from '@/interfaces/product'
import { API_URL_V2 } from '@/constants'
import { getProducts, saveProducts } from '@/sqlite.config'

export function useProductFetch() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [productsData, setProductsData] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  // Initial fetch of products
  const fetchInitialProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('Fetching initial products...')

      // First, try to get products from local storage
      const localProducts = await getProducts()
      console.log('Local products count:', localProducts.length)

      if (localProducts.length > 0) {
        console.log('Using local products')
        setProductsData(localProducts)
        setIsLoading(false)
        return localProducts
      }

      // If no local products, fetch from API
      console.log('Fetching products from API...')
      const response = await axios.get(API_URL_V2)
      const { menu } = response.data

      console.log('API products count:', menu?.length || 0)

      if (!menu || menu.length === 0) {
        console.warn('No products found in API response')
        Alert.alert('No items found', 'Unable to load menu items')
        setError('No products found')
        return []
      }

      // Save fetched products to local storage
      await saveProducts(menu)

      setProductsData(menu)
      return menu
    } catch (error) {
      console.error('Error fetching products:', error)

      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred'

      Alert.alert('Fetch Error', errorMessage)
      setError(errorMessage)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Refresh products
  const refreshProducts = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      console.log('Refreshing products...')
      const response = await axios.get(API_URL_V2)
      const { menu } = response.data

      console.log('Refreshed products count:', menu?.length || 0)

      if (!menu || menu.length === 0) {
        console.warn('No products found during refresh')
        Alert.alert('Refresh Failed', 'No new items found')
        return productsData
      }

      await saveProducts(menu)
      setProductsData(menu)
      return menu
    } catch (error) {
      console.error('Error refreshing products:', error)

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unknown error occurred during refresh'

      Alert.alert('Refresh Error', errorMessage)
      return productsData
    } finally {
      setIsRefreshing(false)
    }
  }, [productsData])

  // Initial effect to fetch products
  useEffect(() => {
    fetchInitialProducts()
  }, [fetchInitialProducts])

  return {
    isLoading,
    isRefreshing,
    productsData,
    error,
    fetchInitialProducts,
    refreshProducts,
    setProductsData,
  }
}
