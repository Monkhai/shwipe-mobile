import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGetRestaurantDetails } from '@/queries/restaurants/useGetRestaurantDetails'
import LoadingView from '../loading/LoadingView'

export default function RestaurantDetailsView() {
  const { restaurant_id } = useLocalSearchParams<{ restaurant_id: string }>()
  const { data, isLoading, error } = useGetRestaurantDetails(restaurant_id)

  if (isLoading) {
    return <LoadingView />
  }
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Restaurant not found</Text>
      </View>
    )
  }

  console.log(data)

  return (
    <View>
      <Text>RestaurantDetailsView</Text>
    </View>
  )
}
