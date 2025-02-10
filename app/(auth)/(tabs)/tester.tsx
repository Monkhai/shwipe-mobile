import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import { BlurView } from 'expo-blur'
import * as Linking from 'expo-linking'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  StyleProps,
  useAnimatedReaction,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Tester() {
  const [isMatched, setIsMatched] = useState(false)
  const presence = useSharedValue(0)

  useAnimatedReaction(
    () => isMatched,
    isMatched => {
      if (isMatched) {
        presence.value = withSpring(1, { mass: 1, damping: 10, stiffness: 150 })
      } else {
        presence.value = withTiming(0)
      }
    }
  )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!isMatched ? (
        <PrimaryButton text="Open modal" onPress={() => setIsMatched(true)} />
      ) : (
        <MatchModal
          restaurant={{
            name: "Yohai's Burgers",
            photos: ['https://picsum.photos/300/300'],
            price_level: 3,
            rating: 5,
            location_url: 'https://maps.google.com',
          }}
          presence={presence}
          onDismiss={() => setIsMatched(false)}
        />
      )}
    </View>
  )
}

function MatchModal({ onDismiss, restaurant, presence }: { onDismiss: () => void; restaurant: Restaurant; presence: SharedValue<number> }) {
  const theme = useColorScheme() ?? 'light'
  const { width: screenWidth } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const imageSize = Math.min(screenWidth * 0.5, 240)
  const fontSize = Math.min(screenWidth * 0.09, 44)
  const containerPadding = Math.min(screenWidth * 0.08, 36)

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        ...StyleSheet.absoluteFillObject,
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
      <Animated.View
        // entering={ZoomIn}
        // exiting={ZoomOut}
        style={[
          {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          },
        ]}
      >
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
              marginTop: -40,
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

        {/* Spacer */}
        <View />
      </Animated.View>

      {/* Restaurant Card */}
      <AnimatedBlurView
        intensity={30}
        tint={'systemThickMaterialLight'}
        entering={SlideInDown.springify().mass(1).damping(16).stiffness(120)}
        exiting={SlideOutDown}
        style={{
          backgroundColor: colors[theme].white + '33',
          width: '90%',
          borderRadius: 32,
          padding: 16,
          marginBottom: 32,
          overflow: 'hidden',
        }}
      >
        <View style={{ marginBottom: 32 }}>
          {/* Restaurant Title Section */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <UIText type="titleEmphasized" color="white">
              {restaurant.name}
            </UIText>
          </View>

          {/* Info Pills */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <View style={{ borderRadius: 100, overflow: 'hidden' }}>
              <BlurView
                intensity={50}
                tint={'systemMaterialLight'}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <UIText type="caption" color="secondaryLabel">
                  {'💰'.repeat(restaurant.price_level)}
                </UIText>
              </BlurView>
            </View>

            <View style={{ borderRadius: 100, overflow: 'hidden' }}>
              <BlurView
                intensity={50}
                tint={'systemMaterialLight'}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <UIText type="caption" color="secondaryLabel">
                  {'⭐️'.repeat(restaurant.rating)}
                </UIText>
              </BlurView>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <PrimaryButton
            text="Navigate"
            textType="calloutEmphasized"
            onPress={navigateToRestaurant}
            style={{ flex: 1, borderRadius: 16 }}
          />
          <SecondaryButton onPress={onDismiss} style={{ flex: 1, borderRadius: 16 }} textType="calloutEmphasized" text="Done" />
        </View>
      </AnimatedBlurView>
    </Animated.View>
  )
}

const API_KEY = 'AIzaSyALFutkrFeGGS8jR_HVgO1xUqrlJ-_ZZm4'
function navigateToRestaurant() {
  const lat = 37.7749
  const lng = -122.4194
  const url = `https://www.google.com/maps/dir/?api=${API_KEY}&query=${lat},${lng}`
  Linking.openURL(url)
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

function ExitSlideDownAnimation(values: ExitAnimationsValues) {
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
