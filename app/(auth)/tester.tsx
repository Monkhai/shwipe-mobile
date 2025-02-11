import OnboardView from '@/views/onboard/OnboardView'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { BlurView } from 'expo-blur'
import React from 'react'
import Animated from 'react-native-reanimated'

type AppRoute = '/(auth)/friends' | '/(auth)/groups' | '/(auth)/invite-friend'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Tester() {
  return <OnboardView />
}

const mockRestaurant: Restaurant = {
  name: 'Restaurant 1',
  rating: 4.5,
  price_level: 2,
  photos: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
  navigation_links: {
    apple_maps: 'https://www.apple.com',
    google_maps: 'https://www.google.com',
    waze: 'https://www.waze.com',
  },
}
