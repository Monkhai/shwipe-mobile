import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Canvas, LinearGradient, Rect, Circle, RoundedRect } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { useColorScheme, useWindowDimensions, View, Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import ProtectedRoute from '@/shared/ProtectedRoute'
import { Restaurant } from '@/wsHandler/restaurantTypes'
import { SessionMatchModal } from '@/components/session/SessionMatchModal'
import BackgroundLayer from '@/components/ui/BackgroundLayer'

type AppRoute = '/(auth)/friends' | '/(auth)/groups' | '/(auth)/invite-friend'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export default function Tester() {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useColorScheme() ?? 'light'
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const handleNavigate = (route: AppRoute) => {
    router.push(route)
  }

  const buttonScale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isExpanded ? 1 : 0.98) }],
  }))

  return (
    <ProtectedRoute>
      <BackgroundLayer />
      <View style={{ flex: 1, width: '100%' }}>
        {/* Content Container */}
        <View style={{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 16 }}>
          {/* Navigation Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
            <Pressable
              onPress={() => handleNavigate('/(auth)/friends')}
              style={{
                backgroundColor: colors[theme].material,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Ionicons name="people-outline" size={20} color={colors[theme].white} />
              <UIText type="bodyEmphasized" color="white">
                Friends
              </UIText>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('/(auth)/groups')}
              style={{
                backgroundColor: colors[theme].material,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Ionicons name="people-circle-outline" size={20} color={colors[theme].white} />
              <UIText type="bodyEmphasized" color="white">
                Groups
              </UIText>
            </Pressable>
          </View>

          {/* Main Content */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Welcome Text */}
            <View style={{ alignItems: 'center', marginBottom: 48 }}>
              <UIText type="largeTitle" color="white" style={{ marginBottom: 12, textAlign: 'center' }}>
                Find Your Next{'\n'}Favorite Spot
              </UIText>
              <UIText type="body" color="secondaryLabel" style={{ textAlign: 'center' }}>
                Swipe, match, and discover great restaurants{'\n'}with friends and groups
              </UIText>
            </View>

            {/* Large Icon */}
            <Animated.View layout={LinearTransition} style={{ marginBottom: 48 }}>
              <View
                style={{
                  backgroundColor: colors[theme].material,
                  padding: 32,
                  borderRadius: 40,
                  marginBottom: 24,
                }}
              >
                <Ionicons name="restaurant" size={80} color={colors[theme].white} />
              </View>
            </Animated.View>

            {/* Main CTA */}
            <Animated.View
              layout={LinearTransition}
              style={[
                {
                  backgroundColor: colors[theme].material,
                  borderRadius: 24,
                  overflow: 'hidden',
                  width: isExpanded ? '100%' : '80%',
                  shadowColor: colors[theme].label,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.2,
                  shadowRadius: 16,
                  elevation: 8,
                },
                buttonScale,
              ]}
            >
              {/* Session Type Buttons */}
              {isExpanded && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <GeneralButton
                    style={{
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: colors[theme].definedMaterial,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onPress={() => {
                      setIsExpanded(false)
                    }}
                  >
                    <Ionicons name="person-outline" size={24} color={colors[theme].white} />
                    <UIText type="secondaryTitle" color="white">
                      Solo Session
                    </UIText>
                  </GeneralButton>
                  <GeneralButton
                    style={{
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: colors[theme].definedMaterial,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onPress={() => {
                      setIsExpanded(false)
                      handleNavigate('/(auth)/invite-friend')
                    }}
                  >
                    <Ionicons name="people-outline" size={24} color={colors[theme].white} />
                    <UIText type="secondaryTitle" color="white">
                      Friend Session
                    </UIText>
                  </GeneralButton>
                  <GeneralButton
                    style={{
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onPress={() => {
                      setIsExpanded(false)
                      handleNavigate('/(auth)/groups')
                    }}
                  >
                    <Ionicons name="people-circle-outline" size={24} color={colors[theme].white} />
                    <UIText type="secondaryTitle" color="white">
                      Group Session
                    </UIText>
                  </GeneralButton>
                </Animated.View>
              )}
              {/* Main Button */}
              <GeneralButton
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Ionicons name={isExpanded ? 'close-circle-outline' : 'restaurant-outline'} size={24} color={colors[theme].white} />
                <UIText type="title" color="white">
                  {isExpanded ? 'Cancel' : 'Start Swiping'}
                </UIText>
              </GeneralButton>
            </Animated.View>
          </View>
        </View>
      </View>
      {/* <SessionMatchModal restaurant={mockRestaurant} onDismiss={() => {}} /> */}
    </ProtectedRoute>
  )
}

const mockRestaurant: Restaurant = {
  name: 'Restaurant 1',
  rating: 4.5,
  price_level: 2,
  photos: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
  navigation_links: {
    apple_maps: 'https://www.apple.com',
    google_maps: 'https://www.google.com',
    waze: 'https://www.waze.com',
  },
}
