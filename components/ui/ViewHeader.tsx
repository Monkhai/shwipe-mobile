import React from 'react'
import { View } from 'react-native'
import UIText from './UIText'
import BackButton from './buttons/icon-buttons/BackButton'

interface ViewHeaderProps {
  title: string
  description: string
}

export default function ViewHeader({ title, description }: ViewHeaderProps) {
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <BackButton />
        <UIText type="largeTitle">{title}</UIText>
      </View>
      <UIText type="body" color="secondaryLabel">
        {description}
      </UIText>
    </View>
  )
}
