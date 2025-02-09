import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { BlurMask, Canvas, Circle, Group } from '@shopify/react-native-skia'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Platform, View, useColorScheme, useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const NUM_PARTICLES = Platform.select({ android: 25, default: 50 })

type ParticleData = {
  centerX: number
  centerY: number
  radius: number
  speedX: number
  speedY: number
  phaseX: number
  phaseY: number
  scale: number
}

type ParticleProps = {
  particle: ParticleData
  progress: SharedValue<number>
  theme: 'light' | 'dark'
  index: number
}

// Pre-compute particle initial states
const createParticles = (width: number, height: number) =>
  Array.from({ length: NUM_PARTICLES }, () => ({
    centerX: Math.random() * width,
    centerY: Math.random() * height,
    radius: Math.random() * 50 + 25,
    speedX: Math.random() * 0.2 + 0.1,
    speedY: Math.random() * 0.2 + 0.1,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    scale: Math.random() * 0.5 + 0.5,
  }))

const Particle = ({ particle, progress, theme, index }: ParticleProps) => {
  const x = useSharedValue(particle.centerX)
  const y = useSharedValue(particle.centerY)
  const scale = useSharedValue(1)

  useAnimatedReaction(
    () => Math.floor(progress.value * 6), // Only trigger every ~60 degrees of rotation
    currentFrame => {
      // Calculate next position
      const nextX = particle.centerX + Math.cos((currentFrame + 1) * particle.speedX + particle.phaseX) * particle.radius
      const nextY = particle.centerY + Math.sin((currentFrame + 1) * particle.speedY + particle.phaseY) * particle.radius
      const nextScale = (0.5 + Math.sin((currentFrame + 1) * 0.5 + index) * 0.25 + 0.25) * 20

      // Animate to next position smoothly
      x.value = withTiming(nextX, { duration: 1000 }) // Adjust duration as needed
      y.value = withTiming(nextY, { duration: 1000 })
      scale.value = withTiming(nextScale, { duration: 1000 })
    }
  )

  return (
    <Group>
      <Circle cx={x} cy={y} r={20} color={colors[theme].primary + '20'}></Circle>
      <Circle cx={x} cy={y} r={8} color={colors[theme].primary + '40'}></Circle>
    </Group>
  )
}

export default function NotFoundView() {
  const theme = useColorScheme() ?? 'light'
  const { width, height } = useWindowDimensions()

  // Animation values for main content
  const mainScale = useSharedValue(0.8)
  const mainOpacity = useSharedValue(0)
  const textY = useSharedValue(20)

  // Create animation progress
  const progress = useSharedValue(0)
  const particles = React.useMemo(() => createParticles(width, height), [width, height])

  useEffect(() => {
    // Slower progress for fewer updates
    progress.value = withRepeat(
      withTiming(10, {
        // Reduced range for fewer steps
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false
    )

    // Animate main content
    mainScale.value = withSpring(1, { damping: 10, stiffness: 100 })
    mainOpacity.value = withTiming(1, { duration: 800 })
    textY.value = withSpring(0, { damping: 12, stiffness: 100 })
  }, [])

  const mainStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mainScale.value }],
    opacity: mainOpacity.value,
  }))

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textY.value }],
  }))

  return (
    <View style={{ flex: 1, backgroundColor: colors[theme].background }}>
      <Canvas style={{ flex: 1 }} mode="continuous">
        {/* Floating particles with glow effect */}
        <Group>
          {particles.map((particle, index) => (
            <Particle key={index} particle={particle} progress={progress} theme={theme} index={index} />
          ))}
          <BlurMask style={'normal'} blur={10} />
        </Group>
      </Canvas>

      {/* Main Content */}
      <Animated.View
        style={[
          mainStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Animated.View style={[textStyle, { alignItems: 'center', paddingHorizontal: 40 }]}>
          <View style={{}}>
            <UIText type="largeTitleEmphasized">404</UIText>
          </View>
          <View style={{ marginBottom: 8 }}>
            <UIText type="title">Oops! Lost in Space</UIText>
          </View>
          <View style={{ marginBottom: 32 }}>
            <UIText type="body" color="secondaryLabel">
              Houston, we have a problem. The page you're looking for has drifted into deep space.
            </UIText>
          </View>
        </Animated.View>

        <PrimaryButton
          text="Return to Earth"
          type="primary"
          textType="bodyEmphasized"
          onPress={() => {
            mainScale.value = withSpring(0.8)
            mainOpacity.value = withTiming(0, { duration: 300 })
            setTimeout(() => router.dismissTo('/(auth)/(tabs)/home'), 300)
          }}
        />
      </Animated.View>
    </View>
  )
}
