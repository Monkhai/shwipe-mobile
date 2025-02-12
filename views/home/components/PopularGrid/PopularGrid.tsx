import { View, Text } from 'react-native'
import React from 'react'
import UIText from '@/components/ui/UIText'
import FeaturedRestaurant from './components/PopularRestaurant'

export default function PopularGrid() {
  return (
    <View>
      <UIText type="title" color="label" style={{ marginBottom: 24 }}>
        Popular Around You
      </UIText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <FeaturedRestaurant
          image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
          name="Pizza Express"
          cuisine="Italian • $$"
          rating="4.6"
        />
        <FeaturedRestaurant
          image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
          name="Veggie Delight"
          cuisine="Vegetarian • $$"
          rating="4.5"
        />
        <FeaturedRestaurant
          image="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
          name="Taco Fiesta"
          cuisine="Mexican • $"
          rating="4.7"
        />
        <FeaturedRestaurant
          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          name="Sushi Master"
          cuisine="Japanese • $$$"
          rating="4.9"
        />
      </View>
    </View>
  )
}
