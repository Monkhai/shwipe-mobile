import { PrimaryButton, TertiaryButton } from '@/components/ui/buttons/Buttons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { GroupInvitationStatus } from '@/queries/groups/groupTypes'
import { useGetGroupInvitation } from '@/queries/groups/useGetGroupInvitation'
import { useUpdateGroupInvitation } from '@/queries/groups/useUpdateGroupInvitation'
import { Redirect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, Platform, StyleSheet, useColorScheme, View } from 'react-native'
import Animated, { FadeIn, SlideInRight, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import LoadingView from '../loading/LoadingView'
import { Pressable } from 'react-native'
import { BlurView } from 'expo-blur'
import { FlatList } from 'react-native-gesture-handler'

interface Props {
  groupId: string
  onSuccess: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

// Mock data for simulating 10 users
const MOCK_MEMBERS = Array.from({ length: 10 }, (_, i) => ({
  id: `mock-${i}`,
  display_name: `User ${i + 1}`,
  photo_url: `https://i.pravatar.cc/150?u=${i}`,
}))

export default function GroupInvitationView({ groupId, onSuccess }: Props) {
  const { data: groupInvitation, isLoading } = useGetGroupInvitation(groupId)
  const { mutate: updateGroupInvitation, isPending: isMutationPending } = useUpdateGroupInvitation()
  const theme = useColorScheme() ?? 'light'

  // Track which button is loading with a separate state
  const [pendingAction, setPendingAction] = useState<'join' | 'decline' | null>('join')

  // Simulate 10 users for testing
  const simulationMode = false
  const membersToDisplay = simulationMode ? MOCK_MEMBERS : groupInvitation?.members || []

  // For simulation of loading state
  const simulateLoading = false
  const isJoinPending = simulateLoading || (isMutationPending && pendingAction === 'join')
  const isDeclinePending = simulateLoading || (isMutationPending && pendingAction === 'decline')

  if (isLoading && !simulationMode) {
    return <LoadingView />
  }

  if (!groupInvitation && !simulationMode) {
    return <Redirect href="/not-found" />
  }

  const groupName = groupInvitation?.name || 'Test Group'

  function handleJoin() {
    if (!groupInvitation && !simulationMode) return
    setPendingAction('join')
    updateGroupInvitation(
      { groupId: groupInvitation?.id || '', status: GroupInvitationStatus.ACCEPTED },
      {
        onSuccess,
        onSettled: () => {
          setPendingAction(null)
        },
      }
    )
  }

  function handleDecline() {
    if (!groupInvitation && !simulationMode) return
    setPendingAction('decline')
    updateGroupInvitation(
      { groupId: groupInvitation?.id || '', status: GroupInvitationStatus.REJECTED },
      {
        onSuccess,
        onSettled: () => setPendingAction(null),
      }
    )
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <View style={styles.header}>
        <UIText type="titleEmphasized">{groupName}</UIText>
        <UIText type="caption" color="secondaryLabel" style={{ marginTop: 4 }}>
          You've been invited to join this group
        </UIText>
      </View>

      {/* Members */}
      <FlatList
        data={membersToDisplay}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.membersList}
        renderItem={({ item, index }) => <MemberItem key={item.id} member={item} index={index} theme={theme} />}
      />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <PrimaryButton
          style={styles.button}
          text="Join Group"
          textType="bodyEmphasized"
          onPress={handleJoin}
          isLoading={isJoinPending}
          disabled={isMutationPending}
        />
        <TertiaryButton
          style={styles.declineButton}
          type="danger"
          text="Decline"
          textType="callout"
          onPress={handleDecline}
          isLoading={isDeclinePending}
          disabled={isMutationPending}
        />
      </View>
    </Animated.View>
  )
}

function MemberItem({ member, index, theme }: { member: any; index: number; theme: 'light' | 'dark' }) {
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
      <Animated.View
        entering={SlideInRight.delay(Math.min(index * 60, 300))
          .springify()
          .mass(0.8)
          .damping(12)}
      >
        <View style={[styles.memberItem]}>
          <BlurView intensity={100} style={styles.blurContainer}>
            <View style={styles.cardContent}>
              <Image source={{ uri: member.photo_url }} style={styles.avatar} />
              <UIText type="bodyEmphasized">{member.display_name}</UIText>
            </View>
          </BlurView>
        </View>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      entering={SlideInRight.delay(Math.min(index * 60, 300))
        .springify()
        .mass(0.8)
        .damping(12)}
    >
      <View style={[styles.memberItem, { backgroundColor: colors[theme].elevatedBackground }]}>
        <View style={styles.cardContent}>
          <Image source={{ uri: member.photo_url }} style={styles.avatar} />
          <UIText type="bodyEmphasized">{member.display_name}</UIText>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 4,
  },
  membersList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  memberItem: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    gap: 16,
  },
  button: {
    flex: 1,
    minHeight: 44,
  },
  declineButton: {
    flex: 1,
  },
})
