import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import UIText from '../ui/UIText'
import { Restaurant } from '@/wsHandler/restaurantTypes'

interface Props {
  restaurant: Restaurant
  condensed?: boolean
}
export default function RestaurantInfoPills({ restaurant, condensed = false }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
      <View style={{ borderRadius: 100, overflow: 'hidden' }}>
        <BlurView intensity={50} tint={'systemMaterialLight'} style={styles.infoPill}>
          <UIText type="caption" color="white">
            {condensed ? `${restaurant.price_level}💰` : '💰'.repeat(restaurant.price_level)}
          </UIText>
        </BlurView>
      </View>

      <View style={{ borderRadius: 100, overflow: 'hidden' }}>
        <BlurView intensity={50} tint={'systemMaterialLight'} style={styles.infoPill}>
          <UIText type="caption" color="white">
            {condensed ? `${restaurant.rating}⭐️` : '⭐️'.repeat(restaurant.rating)}
          </UIText>
        </BlurView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 4,
  },
})
