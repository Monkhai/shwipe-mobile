import { useSessionStore } from '@/zustand/sessionStore'
import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import RestaurantCard, { RestaurantCardRef } from './components/RestaurantCard'

export default function RestaurantPicker() {
  const { restaurants, isSessionStarted } = useSessionStore()
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const cardRefs = useRef<RestaurantCardRef[]>([])

  if (!restaurants || restaurants.length === 0 || !isSessionStarted) return null

  const reversedRestaurants = restaurants.toReversed()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', width: '100%' }}>
      <View style={{ width: '70%', height: '60%' }}>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginTop: 20 }}>
        <Pressable
          onPress={() => {
            const card = cardRefs.current[restaurantIndex]
            if (card) {
              card.dislike()
            } else {
              console.log('no card')
            }
          }}
          style={{ backgroundColor: '#FF3B30', padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: 'white' }}>Dislike</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            const card = cardRefs.current[restaurantIndex]
            if (card) {
              card.like()
            } else {
              console.log('no card')
            }
          }}
          style={{ backgroundColor: '#34C759', padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: 'white' }}>Like</Text>
        </Pressable>
      </View>
    </View>
  )
}
