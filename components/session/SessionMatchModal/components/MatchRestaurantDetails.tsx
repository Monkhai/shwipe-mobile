import { View, Text } from 'react-native'
import React from 'react'
import { useGetRestaurantDetails } from '@/queries/restaurants/useGetRestaurantDetails'
import LoadingView from '@/views/loading/LoadingView'
import RestaurantDetailsViewUI from '@/views/restaurant/RestaurantDetailsViewUI'
import UIView from '@/components/ui/UIView'

interface Props {
  restaurantId: string
}
export default function MatchRestaurantDetails({ restaurantId }: Props) {
  const { data, isLoading } = useGetRestaurantDetails(restaurantId)

  if (isLoading) {
    return (
      <UIView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      </UIView>
    )
  }

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Restaurant not found</Text>
      </View>
    )
  }

  return <RestaurantDetailsViewUI hideBackButton restaurant={data} />
}
