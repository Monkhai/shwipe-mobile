import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { texts, TextType } from '@/constants/texts'
import { ColorType, colors } from '@/constants/colors'

interface Props {
  type?: TextType
  color?: ColorType
  children: string
}

export default function UIText({ type = 'body', color = 'label', children }: Props) {
  const theme = useColorScheme() ?? 'light'
  return <Text style={[{ color: colors[theme][color] }, texts[type]]}>{children}</Text>
}
