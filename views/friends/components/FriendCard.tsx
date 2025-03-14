import { GeneralButton } from '@/components/ui/buttons/Buttons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { FriendRequest } from '@/queries/friendRequests/friendRequestsTypes'
import { Friend } from '@/queries/friends/friendsTypes'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, Platform, useColorScheme, View } from 'react-native'

interface FriendCardProps {
  friend: Friend | FriendRequest
  onPress: () => void
}

export default function FriendCard({ friend, onPress }: FriendCardProps) {
  const theme = useColorScheme() ?? 'light'

  if (Platform.OS === 'ios') {
    return (
      <GeneralButton onPress={onPress} style={{}}>
        <BlurView
          intensity={100}
          style={{
            overflow: 'hidden',
            padding: 16,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 12,
          }}
        >
          <FriendCardContent friend={friend} />
        </BlurView>
      </GeneralButton>
    )
  }

  return (
    <GeneralButton
      onPress={onPress}
      style={{
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: colors[theme].thinMaterial,
      }}
    >
      <FriendCardContent friend={friend} />
    </GeneralButton>
  )
}

function FriendCardContent({ friend }: { friend: Friend | FriendRequest }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Image source={{ uri: friend.photo_url }} style={{ width: 32, height: 32, borderRadius: 16 }} />
      <UIText color="label" type="bodyEmphasized">
        {friend.display_name}
      </UIText>
    </View>
  )
}
