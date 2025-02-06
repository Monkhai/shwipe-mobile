import { Restaurant } from '@/wsHandler/restaurantTypes'
import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { RestaurantCardRef } from './components/RestaurantCard'
import TEST_RestaurantCard from './components/TEST_RestaurantCard'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import X, { WhiteX } from '@/components/shapes/X'
import Heart, { WhiteHeart } from '@/components/shapes/Heart'
import { colors } from '@/constants/colors'

export default function TEST_RestaurantPicker() {
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const cardRefs = useRef<RestaurantCardRef[]>([])

  const restaurants = Array.from(
    { length: 20 },
    (_, index) =>
      ({
        id: index,
        name: `Restaurant ${index + 1}`,
        photos: [`https://picsum.photos/200/300?random=${index}`],
        rating: 4.5,
        price_level: 2,
      } as Restaurant)
  )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <View style={{ width: '90%', height: '80%' }}>
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
            backgroundColor: colors.light.danger,
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
            backgroundColor: colors.light.success,
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
