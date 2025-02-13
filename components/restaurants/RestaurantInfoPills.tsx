import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import UIText from '../ui/UIText'
import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors'

interface Props {
  restaurant: Restaurant
  condensed?: boolean
}
export default function RestaurantInfoPills({ restaurant, condensed = false }: Props) {
  const theme = useColorScheme() ?? 'light'
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
      <View style={{ borderRadius: 100, overflow: 'hidden' }}>
        <BlurView intensity={50} tint={'systemMaterialLight'} style={styles.infoPill}>
          {condensed ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <UIText type="caption" color="white">
                {restaurant.price_level}
              </UIText>
              <Ionicons name="cash-outline" size={14} color={colors[theme].success} />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {Array.from({ length: restaurant.price_level }).map((_, index) => (
                <Ionicons key={index} name="cash-outline" size={14} color={colors[theme].success} />
              ))}
            </View>
          )}
        </BlurView>
      </View>

      <View style={{ borderRadius: 100, overflow: 'hidden' }}>
        <BlurView intensity={50} tint={'systemMaterialLight'} style={styles.infoPill}>
          {condensed ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <UIText type="caption" color="white">
                {restaurant.rating}
              </UIText>
              <Ionicons name="star" size={14} color={colors[theme].warning} />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              {Array.from({ length: restaurant.rating }).map((_, index) => (
                <Ionicons key={index} name="star" size={14} color={colors[theme].warning} />
              ))}
            </View>
          )}
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
