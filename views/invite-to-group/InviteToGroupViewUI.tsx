import UIText from '@/components/ui/UIText'
import { GeneralButton, PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { Friend } from '@/queries/friends/friendsTypes'
import { Group } from '@/queries/groups/groupTypes'
import React from 'react'
import { ActivityIndicator, FlatList, Image, useColorScheme, View } from 'react-native'

interface Props {
  group: Group
  friends: Array<Friend>
  onInvite: (friendId: string) => void
  onCancel: (friendId: string) => void
  isPending?: boolean
}

export default function InviteToGroupViewUI({ group, friends, onInvite, onCancel, isPending }: Props) {
  const theme = useColorScheme() ?? 'light'

  if (friends.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <UIText type="body" color="secondaryLabel">
          No friends to invite. Add some friends first!
        </UIText>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors[theme].elevatedBackground }}>
      <View style={{ padding: 16 }}>
        <UIText type="title">Invite to {group.name}</UIText>
      </View>
      <FlatList
        data={friends}
        style={{ padding: 16 }}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <FriendItem
            friend={item}
            group={group}
            onInvite={() => onInvite(item.id)}
            onCancel={() => onCancel(item.id)}
            isPending={isPending}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

interface FriendItemProps {
  friend: Friend
  group: Group
  onInvite: () => void
  onCancel: () => void
  isPending?: boolean
}

function FriendItem({ friend, onInvite, onCancel, isPending, group }: FriendItemProps) {
  const theme = useColorScheme() ?? 'light'
  const isInvited = group.pendingMembers.some(m => m.id === friend.id)
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors[theme].secondaryBackground,
          padding: 16,
          borderRadius: 12,
          justifyContent: 'space-between',
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors[theme].primary + '20',
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: friend.photo_url }} style={{ width: '100%', height: '100%' }} />
          </View>
        </View>
        <View>
          <UIText type="body">{friend.display_name}</UIText>
        </View>
      </View>
      {isInvited ? (
        <PrimaryButton
          type="danger"
          textType="bodyEmphasized"
          text="Cancel"
          onPress={onCancel}
          style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          isLoading={isPending}
        />
      ) : (
        <PrimaryButton
          textType="bodyEmphasized"
          text="Invite"
          onPress={onInvite}
          style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          isLoading={isPending}
        />
      )}
    </View>
  )
}
