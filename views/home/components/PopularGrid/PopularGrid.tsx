import UIText from '@/components/ui/UIText'
import { useGetPopularRestaurants } from '@/queries/restaurants/useGetPopularRestaurants'
import React from 'react'
import { FlatList, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FeaturedRestaurant from './components/PopularRestaurant'

export default function PopularGrid() {
  const { data: popularRestaurants, refetch, isRefetching } = useGetPopularRestaurants()
  const { width: screenWidth } = useWindowDimensions()
  const cardSize = (screenWidth - 48) / 2 // 16px padding on each side and 16px gap between cards
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <UIText type="secondaryTitle" color="label" style={{ marginBottom: 24, marginLeft: 16 }}>
        Popular Around You
      </UIText>
      <FlatList
        onRefresh={refetch}
        refreshing={isRefetching}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, alignItems: 'center', paddingBottom: insets.bottom + 90 }}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        data={popularRestaurants}
        keyExtractor={(item, i) => item.place_id ?? String(i)}
        renderItem={({ item: restaurant }) => {
          return <FeaturedRestaurant restaurant={restaurant} />
        }}
      />
    </View>
  )
}
