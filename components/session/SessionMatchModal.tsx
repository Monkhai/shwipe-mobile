import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { Canvas, Circle, LinearGradient, Rect, RoundedRect } from '@shopify/react-native-skia'
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
        style={[StyleSheet.absoluteFill, { backgroundColor: 'white' }]}
      >
        <Rect style="fill" x={0} y={0} width={size.width} height={size.height}>
          <LinearGradient
            colors={[colors[theme].success + 'FF', colors[theme].primary + 'AA']}
            positions={[0.1, 1]}
            start={{ x: size.width, y: 0 }}
            end={{ x: 0, y: size.height }}
          />
        </Rect>
        {/* <Circle cx={size.width * 0.8} cy={size.height * 0.15} r={120} color={colors[theme].success + '15'} />
        <Circle cx={size.width * 0.9} cy={size.height * 0.18} r={80} color={colors[theme].success + '10'} />
        <Circle cx={size.width * 0.15} cy={size.height * 0.75} r={180} color={colors[theme].primary + '15'} />
        <Circle cx={size.width * 0.2} cy={size.height * 0.8} r={120} color={colors[theme].primary + '10'} />
        <RoundedRect
          x={size.width * 0.4}
          y={size.height * 0.4}
          width={size.width * 0.6}
          height={size.height * 0.1}
          r={20}
          color={colors[theme].success + '10'}
        />
        <RoundedRect
          x={-size.width * 0.2}
          y={size.height * 0.2}
          width={size.width * 0.6}
          height={size.height * 0.15}
          r={20}
          color={colors[theme].primary + '10'}
        /> */}
      </Canvas>

      {/* Match Container */}
      <MatchModelBody restaurant={restaurant} />

      {/* Match Footer */}
      <MatchModelFooter restaurant={restaurant} onDismiss={onDismiss} />
    </Animated.View>
  )
}
