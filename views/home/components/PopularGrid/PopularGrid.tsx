import UIText from '@/components/ui/UIText'
import { useGetPopularRestaurants } from '@/queries/restaurants/useGetPopularRestaurants'
import React from 'react'
import { FlatList, View } from 'react-native'
import FeaturedRestaurant from './components/PopularRestaurant'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PopularGrid() {
  const { data: popularRestaurants } = useGetPopularRestaurants()
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1 }}>
      <UIText type="title" color="label" style={{ marginBottom: 24 }}>
        Popular Around You
      </UIText>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingBottom: insets.bottom + 90 }}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        data={popularRestaurants}
        renderItem={({ item: restaurant, index }) => {
          return <FeaturedRestaurant key={index} restaurant={restaurant} />
        }}
      />
    </View>
  )
}
