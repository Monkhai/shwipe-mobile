import { SessionMatchModal } from '@/components/session/SessionMatchModal/SessionMatchModal'
import UIView from '@/components/ui/UIView'
import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import React from 'react'
import { useColorScheme, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Tester() {
  const theme = useColorScheme() ?? 'light'
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  return (
    <UIView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SessionMatchModal restaurant={mockRestaurant} onDismiss={() => {}} />
      </View>
    </UIView>
  )
}

const mockRestaurant: Restaurant = {
  place_id: 'ChIJuZSUX1s2HRURCLiykAK1oSU',
  name: 'Chipotle Mexican Grill',
  rating: 4.5,
  price_level: 2,
  photos: ['https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000'],
  address: '789 Market St, San Francisco, CA 94103',
  navigation_links: {
    google_maps: 'https://goo.gl/maps/chipotle-sf',
    apple_maps: 'https://maps.apple.com/?address=789+Market+St,San+Francisco,CA',
    waze: 'https://waze.com/ul?ll=37.785834,-122.406417',
  },
}
