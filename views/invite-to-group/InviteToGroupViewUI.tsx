import UIText from '@/components/ui/UIText'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { Friend } from '@/queries/friends/friendsTypes'
import { Group } from '@/queries/groups/groupTypes'
import React, { useCallback } from 'react'
import { FlatList, Image, Platform, StyleSheet, useColorScheme, View } from 'react-native'
import Animated, {
  FadeIn,
  SlideInRight,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

interface Props {
  group: Group
  friends: Array<Friend>
  onInvite: (friendId: string) => void
  onCancel: (friendId: string) => void
  isPending?: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function InviteToGroupViewUI({ group, friends, onInvite, onCancel, isPending }: Props) {
  const theme = useColorScheme() ?? 'light'

  if (friends.length === 0) {
    return (
      <Animated.View entering={FadeIn.duration(300)} style={styles.emptyContainer}>
        <Animated.View entering={ZoomIn.delay(100).duration(400)}>
          <Ionicons name="people-outline" size={64} color={colors[theme].secondaryLabel} />
        </Animated.View>
        <UIText type="bodyEmphasized" color="secondaryLabel" style={{ textAlign: 'center', marginTop: 16 }}>
          No friends to invite. Add some friends first!
        </UIText>
      </Animated.View>
    )
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.header}>
        <UIText type="titleEmphasized">Invite to {group.name}</UIText>
        <UIText type="caption" color="secondaryLabel" style={{ marginTop: 4 }}>
          Select friends to join your group
        </UIText>
      </View>

      <FlatList
        data={friends}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={SlideInRight.delay(index * 60)
              .springify()
              .mass(0.8)
              .damping(12)}
            layout={LinearTransition}
          >
            <FriendItem
              friend={item}
              group={group}
              onInvite={() => onInvite(item.id)}
              onCancel={() => onCancel(item.id)}
              isPending={isPending}
            />
          </Animated.View>
        )}
        keyExtractor={item => item.id}
      />
    </Animated.View>
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
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(0.97)
  }, [])

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  if (Platform.OS === 'ios') {
    return (
      <AnimatedPressable onPressIn={onPressIn} onPressOut={onPressOut} style={[styles.friendItem, animatedStyle]}>
        <BlurView intensity={25} tint={theme} style={styles.blurContainer}>
          <View style={styles.cardContent}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarFrame}>
                <Image source={{ uri: friend.photo_url }} style={styles.avatar} resizeMode="cover" />
                {isInvited && (
                  <View style={styles.statusBadge}>
                    <Ionicons name="checkmark" size={10} color="#fff" />
                  </View>
                )}
              </View>

              <View style={styles.nameSection}>
                <UIText type="bodyEmphasized">{friend.display_name}</UIText>
                <UIText type="caption" color="secondaryLabel">
                  {isInvited ? 'Invitation sent' : 'Not invited yet'}
                </UIText>
              </View>
            </View>

            {isInvited ? (
              <SecondaryButton
                type="danger"
                textType="caption"
                text="Cancel"
                onPress={onCancel}
                isLoading={isPending}
                style={styles.button}
              />
            ) : (
              <PrimaryButton textType="caption" text="Invite" onPress={onInvite} isLoading={isPending} style={styles.button} />
            )}
          </View>
        </BlurView>
      </AnimatedPressable>
    )
  }

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.friendItem,
        animatedStyle,
        {
          backgroundColor: isInvited ? colors[theme].primary + '08' : colors[theme].elevatedBackground,
        },
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarFrame}>
            <Image source={{ uri: friend.photo_url }} style={styles.avatar} resizeMode="cover" />
            {isInvited && (
              <View style={[styles.statusBadge, { backgroundColor: colors[theme].primary }]}>
                <Ionicons name="checkmark" size={10} color="#fff" />
              </View>
            )}
          </View>

          <View style={styles.nameSection}>
            <UIText type="bodyEmphasized">{friend.display_name}</UIText>
            <UIText type="caption" color="secondaryLabel">
              {isInvited ? 'Invitation sent' : 'Not invited yet'}
            </UIText>
          </View>
        </View>

        {isInvited ? (
          <SecondaryButton type="danger" textType="caption" text="Cancel" onPress={onCancel} isLoading={isPending} style={styles.button} />
        ) : (
          <PrimaryButton textType="caption" text="Invite" onPress={onInvite} isLoading={isPending} style={styles.button} />
        )}
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  friendItem: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatarFrame: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  nameSection: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    minHeight: 32,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
})
