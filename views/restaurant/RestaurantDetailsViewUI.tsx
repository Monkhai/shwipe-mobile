import { View, Text } from 'react-native'
import React from 'react'
import { RestaurantDetails } from '@/queries/restaurants/restaurantTypes'

interface Props {
  restaurant: RestaurantDetails
}
export default function RestaurantDetailsViewUI({ restaurant }: Props) {
  return (
    <View>
      <Text>RestaurantDetailsViewUI</Text>
    </View>
  )
}
