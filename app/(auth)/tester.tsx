import { SessionMatchModal } from '@/components/session/SessionMatchModal'
import TEST_RestaurantPicker from '@/views/session/components/RestaurantPicker/TEST_RestaurantPicker'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Button, View } from 'react-native'
import Animated from 'react-native-reanimated'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Tester() {
  const [isMatched, setIsMatched] = useState(false)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SessionMatchModal restaurant={mockRestaurant} onDismiss={() => setIsMatched(false)} />
      <Button title="Show Match" onPress={() => setIsMatched(true)} />
    </View>
  )
}

const mockRestaurant: Restaurant = {
  name: 'Mock Restaurant',
  rating: 4.5,
  price_level: 2,
  photos: ['https://picsum.photos/200/300'],
  navigation_links: { google_maps: '', apple_maps: '', waze: '' },
}
