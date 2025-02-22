import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Group } from '@/queries/groups/groupTypes'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, useColorScheme, View } from 'react-native'

interface GroupCardProps {
  group: Group
  onPress: (groupId: string) => void
}

export default function GroupCard({ group, onPress }: GroupCardProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    // <BlurView intensity={80} tint="systemThickMaterial" style={{ borderRadius: 12, overflow: 'hidden' }}>
    // <View></View>
    <GeneralButton
      onPress={() => onPress(group.id)}
      style={{
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: colors[theme].thickMaterial,
      }}
    >
      <UIText color="label" type="bodyEmphasized">
        {group.name}
      </UIText>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {group.members.slice(0, 3).map((member, i) => {
          return (
            <View
              style={{
                marginLeft: i > 0 ? -10 : 0,
                borderRadius: 16,
                zIndex: 3 - i,
              }}
              key={i}
            >
              <Image source={{ uri: member.photo_url }} style={{ width: 24, height: 24, borderRadius: 100 }} />
            </View>
          )
        })}
        {group.members.length > 3 && (
          <View style={{ borderRadius: 16, zIndex: 0, backgroundColor: colors[theme].elevatedBackground, padding: 4 }}>
            <UIText type="caption">{`+${group.members.length - 3}`}</UIText>
          </View>
        )}
      </View>
    </GeneralButton>
    // </BlurView>
  )
}
