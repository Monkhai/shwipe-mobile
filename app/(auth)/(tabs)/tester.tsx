import { GeneralButton, PrimaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import TEST_RestaurantPicker from '@/views/session/components/RestaurantPicker/TEST_RestaurantPicker'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export default function Tester() {
  const [isMatched, setIsMatched] = useState(false)
  const presence = useSharedValue(0)

  useAnimatedReaction(
    () => isMatched,
    isMatched => {
      if (isMatched) {
        presence.value = withSpring(1, { mass: 1, damping: 15, stiffness: 150 })
      } else {
        presence.value = withTiming(0)
      }
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: presence.value,
    }
  })

  const buttonContainerAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedValue = interpolate(presence.value, [0, 1], [90, 0])
    return {
      transform: [
        // { skewY: `${interpolatedValue / 2}deg` },
        { skewX: `${interpolatedValue / 2}deg` },
        { rotate: `${interpolatedValue}deg` },
        { scale: presence.value },
      ],
    }
  })

  const linkToRandomImage = 'https://picsum.photos/200/300'
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PrimaryButton text="Open modal" onPress={() => setIsMatched(true)} />
      <Animated.View
        style={[
          animatedStyle,
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.3)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Animated.View style={[buttonContainerAnimatedStyle, { width: '70%', height: '90%' }]}>
          <GeneralButton onPress={() => setIsMatched(false)}>
            <Image src={linkToRandomImage} width={200} height={300} style={{ width: '100%', height: '100%' }} />
          </GeneralButton>
        </Animated.View>
      </Animated.View>
    </View>
  )
}
