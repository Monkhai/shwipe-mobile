import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import BackgroundLayer from '@/views/onboard/components/BackgroundLayer'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  StyleProps,
  withDelay,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const DURATION = 800
const DELAY = 400

export default function OnboardView() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const cardSize = width * 0.27

  return (
    <>
      <BackgroundLayer />

      <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
        <Animated.View entering={SlideInUp.duration(DURATION)} style={{ alignItems: 'center' }}>
          <UIText type="largeTitle" color="white" style={{ marginBottom: 12, textAlign: 'center' }}>
            Hungry Now?{'\n'}Let's Eat
          </UIText>
          <UIText type="body" style={{ textAlign: 'center', color: colors.dark.secondaryLabel }}>
            Find the perfect spot in seconds{'\n'}Solo or with friends
          </UIText>
        </Animated.View>

        <View style={styles.cardsContainer}>
          <AnimatedBlurView
            entering={SlideInLeft.delay(DELAY * 1).duration(DURATION)}
            intensity={20}
            tint="light"
            style={[styles.card, { width: cardSize, height: cardSize, transform: [{ rotate: '-5deg' }] }]}
          >
            <Ionicons name="fast-food-outline" size={32} color={colors.dark.success} />
            <UIText type="callout" color="white">
              Quick Bites
            </UIText>
          </AnimatedBlurView>
          <AnimatedBlurView
            entering={ZoomIn.delay(DELAY * 3).duration(DURATION)}
            style={[styles.card, { width: cardSize, height: cardSize, marginTop: -20 }]}
            intensity={20}
            tint="light"
          >
            <Ionicons name="restaurant-outline" size={32} color={colors.dark.primary} />
            <UIText type="callout" color="white">
              Fine Dining
            </UIText>
          </AnimatedBlurView>
          <AnimatedBlurView
            entering={SlideInRight.delay(DELAY * 4).duration(DURATION)}
            intensity={20}
            tint="light"
            style={[styles.card, { width: cardSize, height: cardSize, transform: [{ rotate: '5deg' }] }]}
          >
            <Ionicons name="cafe-outline" size={32} color={colors.dark.warning} />
            <UIText type="callout" color="white">
              Cafes
            </UIText>
          </AnimatedBlurView>
        </View>

        <GeneralButton
          entering={SlideInDown.delay(DELAY * 5)
            .springify()
            .damping(16)
            .stiffness(120)}
          layout={LinearTransition}
          style={styles.ctaContainer}
        >
          <BlurView intensity={20} tint="light" style={styles.ctaBlurView}>
            <Ionicons name="restaurant-outline" size={24} color={colors.dark.white} />
            <UIText type="title" color="white">
              Start Swiping
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

type LayoutAnimation = {
  initialValues: StyleProps
  animations: StyleProps
  callback?: (finished: boolean) => void
}

function EnterAnimation(): LayoutAnimation {
  'worklet'
  const initialValues: StyleProps = {
    transform: [{ translateY: 0 }, { scale: 0 }],
  }

  const animations: StyleProps = {
    transform: [
      { translateY: withDelay(DELAY * 2.4, withTiming(-40, { duration: DURATION })) },
      { scale: withDelay(DELAY * 2.4, withTiming(1, { duration: DURATION })) },
    ],
  }
  return { initialValues, animations }
}
