import { View, Text, useColorScheme, PressableProps, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react'
import { AnimatedPressable } from './AnimatedPressable'
import Animated, {
  AnimatedProps,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import UIText from '../UIText'
import { colors, ColorType } from '@/constants/colors'
import { texts, TextType } from '@/constants/texts'

export function GeneralButton({ children, style, ...props }: AnimatedProps<PressableProps>) {
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(0.95)
  }, [])
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[animatedStyle, style]} {...props}>
      {children}
    </AnimatedPressable>
  )
}

interface Props extends AnimatedProps<PressableProps> {
  type?: 'primary' | 'danger'
  textType?: TextType
  text: string
  isLoading?: boolean
}

export function PrimaryButton({ type = 'primary', text, textType = 'body', style, isLoading, ...props }: Props) {
  const theme = useColorScheme() ?? 'light'
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(0.95)
  }, [])
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const bgColor: ColorType = type === 'primary' ? 'primary' : 'danger'

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          borderRadius: 12,
          paddingVertical: 14,
          minHeight: texts[textType].minHeight + 28,
          paddingHorizontal: 20,
          backgroundColor: colors[theme][bgColor],
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isLoading || props.disabled ? 0.5 : 1,
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {isLoading ? <ActivityIndicator size="small" color="white" /> : null}
        <UIText color={'white'} type={textType}>
          {text}
        </UIText>
      </View>
    </AnimatedPressable>
  )
}

export function SecondaryButton({ type = 'primary', text, textType = 'body', style, isLoading, ...props }: Props) {
  const theme = useColorScheme() ?? 'light'
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(0.95)
  }, [])
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const textColor: ColorType = type === 'primary' ? 'primary' : 'danger'

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          borderRadius: 12,
          paddingVertical: 14,
          minHeight: texts[textType].minHeight + 28,
          paddingHorizontal: 20,
          alignItems: 'center',
          opacity: isLoading || props.disabled ? 0.5 : 1,
          backgroundColor: colors[theme][textColor] + '33',
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {isLoading ? <ActivityIndicator size="small" color={textColor} /> : null}
        <UIText color={textColor} type={textType}>
          {text}
        </UIText>
      </View>
    </AnimatedPressable>
  )
}
export function TertiaryButton({ type = 'primary', text, textType = 'body', style, isLoading, ...props }: Props) {
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(0.95)
  }, [])
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const textColor: ColorType = type === 'primary' ? 'primary' : 'danger'

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          borderRadius: 12,
          paddingVertical: 14,
          minHeight: texts[textType].minHeight + 28,
          paddingHorizontal: 20,
          alignItems: 'center',
          opacity: isLoading || props.disabled ? 0.5 : 1,
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {isLoading ? <ActivityIndicator size="small" color={textColor} /> : null}
        <UIText color={textColor} type={textType}>
          {text}
        </UIText>
      </View>
    </AnimatedPressable>
  )
}
