import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { texts, TextType } from '@/constants/texts'
import { ColorType, colors } from '@/constants/colors'
import Animated, { LinearTransition } from 'react-native-reanimated'

interface Props {
  type?: TextType
  color?: ColorType
  children: React.ReactNode
}

export default function UIText({ type = 'body', color = 'label', children }: Props) {
  const theme = useColorScheme() ?? 'light'
  return (
    <Animated.Text layout={LinearTransition} style={[{ color: colors[theme][color] }, texts[type]]}>
      {children}
    </Animated.Text>
  )
}
