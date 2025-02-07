import { View, TouchableOpacity } from 'react-native'
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
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <UIText type="titleEmphasized">{group.name}</UIText>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <UIText type="body" color="secondaryLabel">
          {`${group.members.length} members`}
        </UIText>
      </View>
    </GeneralButton>
  )
}
