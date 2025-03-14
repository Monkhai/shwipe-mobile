import { GeneralButton } from '@/components/ui/buttons/Buttons'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/queries/restaurants/restaurantTypes'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native'
import Animated, { SlideInUp, StyleProps, withTiming, ZoomIn, ZoomOut } from 'react-native-reanimated'

interface Props {
  restaurant: Restaurant
}
export default function MatchModelBody({ restaurant }: Props) {
  const theme = useColorScheme() ?? 'light'
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const imageSize = Math.min(screenWidth * 0.8, 300)
  const fontSize = Math.min(screenWidth * 0.09, 44)
  const containerPadding = Math.min(screenWidth * 0.08, 36)
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
      <Animated.View
        entering={SlideInUp.springify().mass(1).damping(16).stiffness(120)}
        exiting={ExitSlideDownAnimation}
        style={[styles.matchContainer, { paddingHorizontal: containerPadding, paddingVertical: containerPadding * 0.5, marginTop: 40 }]}
      >
        <Text
          style={{
            fontSize,
            fontWeight: '800',
            color: colors[theme].white,
            textTransform: 'uppercase',
            letterSpacing: Math.max(fontSize * 0.04, 1),
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}
        >
          It's a Match!
        </Text>
      </Animated.View>

      <Animated.View
        entering={ZoomIn.springify()}
        exiting={ZoomOut}
        style={[
          {
            position: 'absolute',
            top: screenHeight / 2.5 - imageSize / 2,
            borderWidth: 8,
            borderRadius: 1000,
            borderColor: colors[theme].white,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <Image
          source={{ uri: restaurant.photos[0] }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize * 1.25,
          }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  matchContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 32,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

type LayoutAnimation = {
  initialValues: StyleProps
  animations: StyleProps
  callback?: (finished: boolean) => void
}

type ExitAnimationsValues = CurrentLayoutAnimationsValues & WindowDimensions

type CurrentLayoutAnimationsValues = {
  currentOriginX: number
  currentOriginY: number
  currentWidth: number
  currentHeight: number
  currentBorderRadius: number
  currentGlobalOriginX: number
  currentGlobalOriginY: number
}

interface WindowDimensions {
  windowWidth: number
  windowHeight: number
}

function ExitSlideDownAnimation(values: ExitAnimationsValues): LayoutAnimation {
  'worklet'
  const animations: StyleProps = {
    originY: withTiming(values.windowWidth / 1.5),
    transform: [{ scale: withTiming(0) }],
  }
  const initialValues: StyleProps = {
    originY: values.currentOriginY,
    transform: [{ scale: 1 }],
  }
  return { initialValues, animations }
}
