import React from 'react'
import { View } from 'react-native'
import UIText from './UIText'
import BackButton from './buttons/icon-buttons/BackButton'

interface ViewHeaderProps {
  title: string
  description: string
  backButton?: boolean
  children?: React.ReactNode
}

export default function ViewHeader({ title, description, backButton = true, children }: ViewHeaderProps) {
  return (
    <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        {backButton && <BackButton />}
        <View>
          <UIText type="titleEmphasized" color="label">
            {title}
          </UIText>
          <UIText type="caption" color="secondaryLabel">
            {description}
          </UIText>
        </View>
      </View>
      {children}
    </View>
  )
}
