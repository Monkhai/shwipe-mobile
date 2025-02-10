import { SessionMatchModal } from '@/components/session/SessionMatchModal'
import { GeneralButton, PrimaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { View } from 'react-native'
import Animated, { LinearTransition, useAnimatedReaction, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Tester() {
  const [isMatched, setIsMatched] = useState(false)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isMatched ? (
        <SessionMatchModal restaurant={mockRestaurant} onDismiss={() => setIsMatched(false)} />
      ) : (
        <PrimaryButton text="Start Session" onPress={() => setIsMatched(true)} />
      )}
      {/* <Animated.View
        layout={LinearTransition}
        style={{ position: 'absolute', bottom: 0, marginBottom: 32, width: '90%', height: 'auto', backgroundColor: 'red' }}
      >
        {isMatched ? (
          <GeneralButton style={{ width: '100%', height: 100 }} onPress={() => setIsMatched(false)}>
            <UIText>Match</UIText>
          </GeneralButton>
        ) : (
          <GeneralButton style={{ width: '100%', height: 50 }} onPress={() => setIsMatched(true)}>
            <UIText>No Match</UIText>
          </GeneralButton>
        )}
        <Animated.View layout={LinearTransition} style={{ width: '90%', height: 100, backgroundColor: 'blue' }} />
      </Animated.View> */}
    </View>
  )
}

const mockRestaurant: Restaurant = {
  name: 'Mock Restaurant',
  rating: 4.5,
  price_level: 2,
  photos: ['https://picsum.photos/200/300'],
  navigation_links: { google_maps: '', apple_maps: '', waze: '' },
}
