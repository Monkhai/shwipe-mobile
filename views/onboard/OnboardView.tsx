import { useSetOnboardingData } from '@/asyncStorage/storageStore'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import BackgroundLayer from '@/views/onboard/components/BackgroundLayer'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import Animated, { SlideInDown, ZoomIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const DURATION = 800
const DELAY = 350

export default function OnboardView() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const cardSize = width * 0.27
  const { mutate: updateOnboardingData, isPending } = useSetOnboardingData()

  return (
    <>
      <BackgroundLayer />

      <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
        <Animated.View entering={ZoomIn.duration(DURATION)} style={{ alignItems: 'center' }}>
          <UIText type="largeTitle" color="white" style={{ marginBottom: 12, textAlign: 'center' }}>
            Find-Eats
          </UIText>
          <UIText type="body" style={{ textAlign: 'center', color: colors.dark.secondaryLabel }}>
            Find the perfect spot in seconds{'\n'}Solo or with friends
          </UIText>
        </Animated.View>

        <View style={styles.cardsContainer}>
          <Animated.View entering={ZoomIn.delay(DELAY * 1).duration(DURATION)}>
            <BlurView
              intensity={20}
              tint="light"
              style={[styles.card, { width: cardSize, height: cardSize, transform: [{ rotate: '-5deg' }] }]}
            >
              <Ionicons name="fast-food-outline" size={32} color={colors.dark.success} />
              <UIText type="callout" color="white">
                Quick Bites
              </UIText>
            </BlurView>
          </Animated.View>

          <Animated.View entering={ZoomIn.delay(DELAY * 2).duration(DURATION)}>
            <BlurView style={[styles.card, { width: cardSize, height: cardSize, marginTop: -20 }]} intensity={20} tint="light">
              <Ionicons name="restaurant-outline" size={32} color={colors.dark.primary} />
              <UIText type="callout" color="white">
                Fine Dining
              </UIText>
            </BlurView>
          </Animated.View>

          <Animated.View entering={ZoomIn.delay(DELAY * 3).duration(DURATION)}>
            <BlurView
              intensity={20}
              tint="light"
              style={[styles.card, { width: cardSize, height: cardSize, transform: [{ rotate: '5deg' }] }]}
            >
              <Ionicons name="cafe-outline" size={32} color={colors.dark.warning} />
              <UIText type="callout" color="white">
                Cafes
              </UIText>
            </BlurView>
          </Animated.View>
        </View>

        <GeneralButton
          entering={SlideInDown.delay(DELAY * 5)
            .springify()
            .damping(16)
            .stiffness(110)}
          style={styles.ctaContainer}
          onPress={() => {
            updateOnboardingData({ hasCompletedOnboarding: true })
          }}
        >
          <BlurView intensity={20} tint="light" style={styles.ctaBlurView}>
            <UIText type="secondaryTitle" color="white">
              {isPending ? 'Loading...' : 'Start Swiping'}
            </UIText>
          </BlurView>
        </GeneralButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 48,
    paddingHorizontal: 16,
  },
  ctaContainer: {
    borderRadius: 24,
    backgroundColor: colors.light.material,
    overflow: 'hidden',
  },
  ctaBlurView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 32,
  },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.light.material,
    borderRadius: 24,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
})
