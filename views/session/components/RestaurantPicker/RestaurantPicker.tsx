import { WhiteHeart } from '@/components/shapes/Heart'
import { WhiteX } from '@/components/shapes/X'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { useSessionStore } from '@/zustand/sessionStore'
import React, { useRef, useState } from 'react'
import { useColorScheme, View } from 'react-native'
import RestaurantCard, { RestaurantCardRef } from './components/RestaurantCard'

export default function RestaurantPicker() {
  const theme = useColorScheme() ?? 'light'
  const { restaurants, isSessionStarted } = useSessionStore()
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const cardRefs = useRef<RestaurantCardRef[]>([])

  if (!restaurants || restaurants.length === 0 || !isSessionStarted) return null

  const reversedRestaurants = restaurants.toReversed()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <View style={{ width: '90%', height: '80%' }}>
        {reversedRestaurants.map((restaurant, index) => (
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
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', paddingHorizontal: 40, marginTop: 20 }}>
        <GeneralButton
          onPress={() => {
            const card = cardRefs.current[restaurantIndex]
            if (card) {
              card.dislike()
            } else {
              console.log('no card')
            }
          }}
          style={{
            backgroundColor: colors[theme].danger,
            borderRadius: 100,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WhiteX size={48} />
        </GeneralButton>
        <GeneralButton
          onPress={() => {
            const card = cardRefs.current[restaurantIndex]
            if (card) {
              card.like()
            } else {
              console.log('no card')
            }
          }}
          style={{
            backgroundColor: colors[theme].success,
            borderRadius: 100,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WhiteHeart size={42} />
        </GeneralButton>
      </View>
    </View>
  )
}
