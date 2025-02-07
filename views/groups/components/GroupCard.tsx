import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Group } from '@/queries/groups/groupTypes'
import { useColorScheme } from 'react-native'
import { router } from 'expo-router'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'

interface GroupCardProps {
  group: Group
}

export default function GroupCard({ group }: GroupCardProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    <GeneralButton
      onPress={() =>
        router.push({
          pathname: '/(auth)/[group_id]',
          params: { group_id: group.id },
        })
      }
      style={{
        backgroundColor: colors[theme].elevatedBackground,
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <UIText type="titleEmphasized">{group.name}</UIText>
      </View>
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
              <Image
                source={{ uri: member.photo_url }}
                style={{ width: 36, height: 36, borderRadius: 100, borderWidth: 3, borderColor: colors[theme].elevatedBackground }}
              />
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
  )
}
