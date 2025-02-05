import { Image, View, useColorScheme } from 'react-native'
import React from 'react'
import { User } from '@/queries/users/userTypes'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { AnimatedPressable } from '@/components/ui/buttons/AnimatedPressable'
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface Props {
  friends: User[]
  onStartSessionWithFriend: (friendId: string) => void
  isLoading?: boolean
}

export default function FriendsListUI({ friends, onStartSessionWithFriend, isLoading }: Props) {
  if (isLoading) {
    return (
      <View style={{ padding: 20 }}>
        <UIText type="body" color="secondaryLabel">
          Loading friends...
        </UIText>
      </View>
    )
  }

  if (friends.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <UIText type="body" color="secondaryLabel">
          No friends yet. Add some friends to start swiping together!
        </UIText>
      </View>
    )
  }

  return (
    <View style={{ gap: 10 }}>
      {friends.map(friend => (
        <FriendItem key={friend.id} friend={friend} onStartSession={() => onStartSessionWithFriend(friend.id)} />
      ))}
    </View>
  )
}

interface FriendItemProps {
  friend: User
  onStartSession: () => void
}

function FriendItem({ friend, onStartSession }: FriendItemProps) {
  const theme = useColorScheme() ?? 'light'
  const scale = useSharedValue(1)

  const onPressIn = React.useCallback(() => {
    scale.value = withTiming(0.98)
  }, [])

  const onPressOut = React.useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedPressable
      onPress={onStartSession}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors[theme].elevatedBackground,
          padding: 16,
          borderRadius: 12,
          justifyContent: 'space-between',
        },
        animatedStyle,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {friend.photo_url ? (
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
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors[theme].primary + '20',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIText type="title">👤</UIText>
          </View>
        )}
        <View>
          <UIText type="body">{friend.display_name}</UIText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors[theme].primary + '20',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
        }}
      >
        <UIText type="caption" color="primary">
          Start Session
        </UIText>
      </View>
    </AnimatedPressable>
  )
}
