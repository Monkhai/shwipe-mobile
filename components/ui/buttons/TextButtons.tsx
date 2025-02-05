import { View, Text, useColorScheme, PressableProps } from 'react-native'
import React, { useCallback } from 'react'
import { AnimatedPressable } from './AnimatedPressable'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import UIText from '../UIText'
import { colors, ColorType } from '@/constants/colors'
import { TextType } from '@/constants/texts'

export function GeneralButton({ children, style, ...props }: PressableProps) {
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

interface Props extends PressableProps {
  type?: 'primary' | 'danger'
  textType?: TextType
  text: string
}

export function PrimaryButton({ type = 'primary', text, textType = 'body', style, ...props }: Props) {
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
          paddingHorizontal: 20,
          backgroundColor: colors[theme][bgColor],
          minWidth: 200,
          alignItems: 'center',
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <UIText color={'white'} type={textType}>
        {text}
      </UIText>
    </AnimatedPressable>
  )
}

export function SecondaryButton({ type = 'primary', text, textType = 'body', style, ...props }: Props) {
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
          paddingHorizontal: 20,
          minWidth: 200,
          alignItems: 'center',
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <UIText color={textColor} type={textType}>
        {text}
      </UIText>
    </AnimatedPressable>
  )
}
