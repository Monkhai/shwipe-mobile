import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MatchModelBody from './SessionMatchModal/components/MatchModalBody'
import MatchModelFooter from './SessionMatchModal/components/MatchModelFooter'
import MatchModalBackground from './SessionMatchModal/components/MatchModalBackground'

interface Props {
  restaurant: Restaurant

  onDismiss: () => void
}

export function SessionMatchModal({ onDismiss, restaurant }: Props) {
  const insets = useSafeAreaInsets()

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
      }}
    >
      <MatchModalBackground />

      <MatchModelBody restaurant={restaurant} />

      <MatchModelFooter restaurant={restaurant} onDismiss={onDismiss} />
    </Animated.View>
  )
}
