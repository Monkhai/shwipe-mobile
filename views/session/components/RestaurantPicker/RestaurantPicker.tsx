import { useSessionStore } from '@/zustand/sessionStore'
import React, { useRef, useState } from 'react'
import { useColorScheme } from 'react-native'
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RestaurantCard, { RestaurantCardRef } from './components/RestaurantCard'
import RestaurantCardFooter from './components/RestaurantCardFooter'
import RestaurantCardHeader from './components/RestaurantCardHeader'

export default function RestaurantPicker() {
  const theme = useColorScheme() ?? 'light'
  const { restaurants, isSessionStarted } = useSessionStore()
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const cardRefs = useRef<RestaurantCardRef[]>([])
  const insets = useSafeAreaInsets()

  if (!restaurants || restaurants.length === 0 || !isSessionStarted) return null

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        gap: 24,
        paddingHorizontal: 16,
      }}
    >
      <RestaurantCardHeader restaurant={restaurants[restaurantIndex]} />
      <Animated.View layout={LinearTransition} style={{ width: '100%', flex: 1 }}>
        {restaurants.toReversed().map((restaurant, index) => (
          <RestaurantCard
            key={index}
            index={index}
            restaurant={restaurant}
            ref={el => {
              if (!el) return
              cardRefs.current[restaurants.length - 1 - index] = el
            }}
            updateIndex={() => setRestaurantIndex(restaurantIndex + 1)}
          />
        ))}
      </Animated.View>
      <RestaurantCardFooter restaurant={restaurants[restaurantIndex]} cardRefs={cardRefs} restaurantIndex={restaurantIndex} />
    </Animated.View>
  )
}
