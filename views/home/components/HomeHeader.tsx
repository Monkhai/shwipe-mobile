import UIText from '@/components/ui/UIText'
import React from 'react'
import { View } from 'react-native'

export default function HomeHeader() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        {/* <Button title="Test" onPress={() => router.push('/tester')} /> */}
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
