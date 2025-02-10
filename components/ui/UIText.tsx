import { View, Text, useColorScheme, TextStyle, StyleProp, TextProps } from 'react-native'
import React from 'react'
import { texts, TextType } from '@/constants/texts'
import { ColorType, colors } from '@/constants/colors'
import Animated, { LinearTransition } from 'react-native-reanimated'

interface Props extends TextProps {
  type?: TextType
  color?: ColorType
  children: React.ReactNode
}

export default function UIText({ type = 'body', color = 'label', children, style, ...props }: Props) {
  const theme = useColorScheme() ?? 'light'
  return (
    <Animated.Text layout={LinearTransition} style={[{ color: colors[theme][color] }, texts[type], style]} {...props}>
      {children}
    </Animated.Text>
  )
}
