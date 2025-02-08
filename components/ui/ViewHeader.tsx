import { View, Text } from 'react-native'
import React from 'react'
import UIText from './UIText'

interface ViewHeaderProps {
  title: string
  description: string
}

export default function ViewHeader({ title, description }: ViewHeaderProps) {
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ marginBottom: 10 }}>
        <UIText type="largeTitle">{title}</UIText>
      </View>
      <UIText type="body" color="secondaryLabel">
        {description}
      </UIText>
    </View>
  )
}
