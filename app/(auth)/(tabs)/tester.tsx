import { GeneralButton, PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { Canvas, LinearGradient, Rect } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, useColorScheme, View, Dimensions, useWindowDimensions, Platform } from 'react-native'
import Animated, {
  clamp,
  FadeIn,
  FadeOut,
  interpolate,
  SharedValue,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import * as Linking from 'expo-linking'

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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const imageSize = Math.min(screenWidth * 0.5, 240)
  const fontSize = Math.min(screenWidth * 0.09, 44)
  const containerPadding = Math.min(screenWidth * 0.08, 36)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: presence.value }],
    }
  })

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: clamp(presence.value, 0, 1) }],
    }
  })

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Canvas
        onLayout={event => {
          setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })
        }}
        style={[StyleSheet.absoluteFill, { backgroundColor: '#ffffff' }]}
      >
        <Rect color="red" style="fill" x={0} y={0} width={size.width} height={size.height}>
          <LinearGradient
            colors={[colors[theme].success + 'FF', colors[theme].primary + 'AA']}
            positions={[0.1, 1]}
            start={{ x: size.width, y: 0 }}
            end={{ x: 0, y: size.height }}
          />
        </Rect>
      </Canvas>
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }]}
      >
        <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <View style={[styles.matchContainer, { paddingHorizontal: containerPadding, paddingVertical: containerPadding * 0.5 }]}>
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
            </View>

            <Animated.View
              style={[
                imageAnimatedStyle,
                {
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
        </View>
      </Animated.View>
      {/* Restaurant Card */}
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          backgroundColor: colors[theme].elevatedBackground,
          width: '100%',
          paddingTop: 32,
          paddingBottom: 48,
          paddingHorizontal: 24,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <View style={{ marginBottom: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <UIText type="titleEmphasized" color="label">
              {restaurant.name}
            </UIText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
            <UIText type="body" color="secondaryLabel">
              {restaurant.price_level ? '💰'.repeat(restaurant.price_level) : ''}
            </UIText>
            <UIText type="body" color="secondaryLabel">
              {' · '}
            </UIText>
            <UIText type="body" color="secondaryLabel">
              {'⭐️ ' + restaurant.rating}
            </UIText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <GeneralButton
            onPress={navigateToRestaurant}
            style={[
              {
                flex: 1,
                backgroundColor: colors[theme].primary,
                padding: 14,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <UIText type="bodyEmphasized" color="white">
              Navigate
            </UIText>
          </GeneralButton>
          <SecondaryButton
            onPress={onDismiss}
            style={[
              {
                flex: 1,
                backgroundColor: colors[theme].secondaryBackground,
                padding: 14,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            textType="bodyEmphasized"
            text="Done"
          />
        </View>
      </Animated.View>
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
