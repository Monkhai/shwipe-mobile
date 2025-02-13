import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import React, { useEffect } from 'react'
import { StyleSheet, useColorScheme, useWindowDimensions, View } from 'react-native'
import Animated, { FadeIn, FadeOut, useAnimatedRef } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MatchModelBody from './components/MatchModalBody'
import MatchModelFooter from './components/MatchModelFooter'
import MatchModalBackground from './components/MatchModalBackground'
import MatchRestaurantDetails from './components/MatchRestaurantDetails'
import { colors } from '@/constants/colors'

interface Props {
  restaurant: Restaurant

  onDismiss: () => void
}

export function SessionMatchModal({ onDismiss, restaurant }: Props) {
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const ref = useAnimatedRef<Animated.ScrollView>()
  const theme = useColorScheme() ?? 'light'
  useEffect(() => {
    // Add a small delay before starting the animation
    const timeout = setTimeout(() => {
      // Quick scroll down
      ref.current?.scrollTo({ y: 100, animated: true })

      setTimeout(() => {
        // Slower scroll back up
        ref.current?.scrollTo({ y: 0, animated: true })
      }, 300)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Animated.ScrollView
      ref={ref}
      pagingEnabled
      snapToInterval={height}
      decelerationRate={0.1}
      nestedScrollEnabled
      disableIntervalMomentum
      bounces={false}
      showsVerticalScrollIndicator={false}
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        backgroundColor: colors[theme].background,
      }}
    >
      <View
        style={{
          height,
          paddingTop: insets.top,
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MatchModalBackground />
        <MatchModelBody restaurant={restaurant} />
        <MatchModelFooter restaurant={restaurant} onDismiss={onDismiss} />
      </View>

      <View
        style={{
          height,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MatchRestaurantDetails restaurantId={restaurant.place_id} />
      </View>
    </Animated.ScrollView>
  )
}
