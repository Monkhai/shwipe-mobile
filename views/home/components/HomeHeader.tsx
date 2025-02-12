import { View, Text } from 'react-native'
import React from 'react'
import UIText from '@/components/ui/UIText'

export default function HomeHeader() {
  const time = new Date().getHours()
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
      <View>
        <UIText type="titleEmphasized" color="label">
          Shwipe
        </UIText>
        <UIText type="caption" color="secondaryLabel">
          {getGreeting()}, ready to eat?
        </UIText>
      </View>
      <View style={{ height: 44, flex: 1, flexDirection: 'row', gap: 12 }}></View>
    </View>
  )
}

function getGreeting() {
  const time = new Date().getHours()
  if (time < 12) return 'Good morning'
  if (time < 18) return 'Good afternoon'
  return 'Good evening'
}
