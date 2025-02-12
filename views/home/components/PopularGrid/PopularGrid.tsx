import { View, Text } from 'react-native'
import React from 'react'
import UIText from '@/components/ui/UIText'
import FeaturedRestaurant, { PopularRestaurantSkeleton } from './components/PopularRestaurant'
import { useGetPopularRestaurants } from '@/queries/restaurants/useGetPopularRestaurants'

export default function PopularGrid() {
  const { data: popularRestaurants } = useGetPopularRestaurants()
  return (
    <View>
      <UIText type="title" color="label" style={{ marginBottom: 24 }}>
        Popular Around You
      </UIText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {popularRestaurants
          ? popularRestaurants.map((restaurant, i) => <FeaturedRestaurant key={i} restaurant={restaurant} />)
          : Array.from({ length: 4 }).map((_, i) => <PopularRestaurantSkeleton key={i} />)}
      </View>
    </View>
  )
}
