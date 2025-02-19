import React, { useCallback, useMemo } from 'react'
import {
  FlatList,
  RefreshControl,
  type ListRenderItemInfo,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native'

import { Hero } from '@/components/sections/Hero'
import { OrderCategories } from '@/components/sections/OrderCategories'
import { ProductItem } from '@/components/sections/ProductItem'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import type { Product } from '@/interfaces/product'

interface ProductListProps {
  productData: Product[]
  activeCategories?: string[]
  isRefreshing?: boolean
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onSearch?: (query: string) => void
  onRefreshPage?: () => Promise<void>
  onCategoryChange?: (categories: string[]) => void
  onResetFilters?: () => void
}

export function ProductList({
  productData,
  isRefreshing = false,
  activeCategories = [],
  onScroll,
  onSearch,
  onRefreshPage,
  onCategoryChange,
  onResetFilters,
}: ProductListProps) {
  const renderProductItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => {
      const { id, name, description, price, image, category } = item || {}
      return (
        <ProductItem
          id={id}
          name={name}
          description={description}
          price={price}
          image={image}
          category={category}
        />
      )
    },
    [],
  )

  const renderHeaderComponent = useMemo((): JSX.Element => {
    return (
      <>
        <Hero onSearch={onSearch} />
        <OrderCategories
          activeCategories={activeCategories}
          onCategoryChange={onCategoryChange}
        />
      </>
    )
  }, [onSearch])

  const renderEmptyComponent = useCallback(() => {
    return (
      <ThemedView style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText
          type="title"
          style={{
            color: 'red',
          }}>
          No products found
        </ThemedText>
        {onResetFilters && (
          <ThemedText
            style={{
              color: '#495E57',
              marginTop: 10,
            }}
            onPress={onResetFilters}>
            Reset Filters
          </ThemedText>
        )}
      </ThemedView>
    )
  }, [onResetFilters])

  const getKeyExtractor = useCallback((item: Product) => {
    return item?.id.toString()
  }, [])

  return (
    <FlatList
      data={productData}
      renderItem={renderProductItem}
      keyExtractor={getKeyExtractor}
      ListHeaderComponent={renderHeaderComponent}
      ListEmptyComponent={renderEmptyComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefreshPage}
          colors={['#495E57']}
          tintColor={'#495E57'}
        />
      }
      onScroll={onScroll}
      initialNumToRender={10} // Render first 10 items initially
      maxToRenderPerBatch={10} // Render 10 items per batch
      windowSize={21} // Keep 10 views above and below the visible area
      removeClippedSubviews={true} // Unmount components when outside of window
      updateCellsBatchingPeriod={50} // Increase time between batch renders
      getItemLayout={(_, index) => ({
        length: 100, // Adjust based on your item height
        offset: 100 * index,
        index,
      })}
    />
  )
}
