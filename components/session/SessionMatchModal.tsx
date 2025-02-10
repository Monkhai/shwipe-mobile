import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MatchModelBody from './SessionMatchModal/components/MatchModalBody'
import MatchModelFooter from './SessionMatchModal/components/MatchModelFooter'

interface Props {
  restaurant: Restaurant

  onDismiss: () => void
}

export function SessionMatchModal({ onDismiss, restaurant }: Props) {
  const theme = useColorScheme() ?? 'light'
  const [size, setSize] = useState({ width: 0, height: 0 })
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
      <Canvas
        onLayout={event => {
          setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })
        }}
        style={[StyleSheet.absoluteFill, { backgroundColor: '#ffffff' }]}
      >
        <Rect style="fill" x={0} y={0} width={size.width} height={size.height}>
          <LinearGradient
            colors={[colors[theme].success + 'FF', colors[theme].primary + 'AA']}
            positions={[0.1, 1]}
            start={{ x: size.width, y: 0 }}
            end={{ x: 0, y: size.height }}
          />
        </Rect>
      </Canvas>

      {/* Match Container */}
      <MatchModelBody restaurant={restaurant} />

      {/* Match Footer */}
      <MatchModelFooter restaurant={restaurant} onDismiss={onDismiss} />
    </Animated.View>
  )
}
