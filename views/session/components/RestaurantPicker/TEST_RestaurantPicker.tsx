import { WhiteHeart } from '@/components/shapes/Heart'
import { WhiteX } from '@/components/shapes/X'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { RestaurantCardRef } from './components/RestaurantCard'
import TEST_RestaurantCard from './components/TEST_RestaurantCard'
import RestaurantCardFooter from './components/RestaurantCardFooter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RestaurantCardHeader from './components/RestaurantCardHeader'
import Animated, { LinearTransition } from 'react-native-reanimated'

export default function TEST_RestaurantPicker() {
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const cardRefs = useRef<RestaurantCardRef[]>([])
  const insets = useSafeAreaInsets()

  const restaurants = Array.from(
    { length: 20 },
    (_, index) =>
      ({
        id: index,
        name: `Restaurant Restaurant RestaurantRestaurant Restaurant  ${index + 1}`,
        photos: [`https://picsum.photos/200/300?random=${index}`],
        rating: 5,
        price_level: 5,
        navigation_links: {
          google_maps: 'https://www.google.com/maps',
          apple_maps: 'https://www.apple.com/maps',
          waze: 'https://www.waze.com',
        },
      } as Restaurant)
  )

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        gap: 24,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'red',
      }}
    >
      <RestaurantCardHeader restaurant={restaurants[restaurantIndex]} />
      <Animated.View layout={LinearTransition} style={{ width: '100%', flex: 1 }}>
        {restaurants.toReversed().map((restaurant, index) => (
          <TEST_RestaurantCard
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
    </View>
  )
}
