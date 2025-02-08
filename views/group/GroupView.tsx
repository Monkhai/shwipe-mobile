import { View, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import NotFoundView from '../not-found/NotFoundView'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import { User } from '@/queries/users/userTypes'
import ViewHeader from '@/components/ui/ViewHeader'
import LoadingView from '../loading/LoadingView'
import { useLeaveGroup } from '@/queries/groups/useLeaveGroup'

export default function GroupView() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const router = useRouter()
  const { data: group, isLoading: isGroupLoading } = useGetGroup(group_id)
  const { mutate: leaveGroup, isPending: isLeaveGroupPending } = useLeaveGroup()
  const theme = useColorScheme() ?? 'light'

  if (isGroupLoading) {
    return <LoadingView />
  }

  if (!group) {
    return <Redirect href="/+not-found" />
  }

  const handleInviteFriend = () => {
    router.push(`/${group_id}/invite-to-group`)
  }

  const handleStartSession = () => {
    alert('Start session clicked')
  }

  const handleLeaveGroup = () => {
    leaveGroup({ groupId: group_id })
  }

  const renderMember = (member: User) => (
    <View key={member.id} style={[styles.memberCard, { backgroundColor: colors[theme].secondaryBackground }]}>
      <Image source={{ uri: member.photo_url }} style={styles.memberPhoto} />
      <View style={styles.memberInfo}>
        <UIText type="body" color="label">
          {member.display_name}
        </UIText>
      </View>
    </View>
  )

  return (
    <>
      <Stack.Screen options={{ title: group.name }} />
      <View style={styles.container}>
        <ViewHeader title={group.name} description={`${group.members.length} ${group.members.length === 1 ? 'Member' : 'Members'}`} />

        <View style={styles.actionButtons}>
          <PrimaryButton
            textType="bodyEmphasized"
            text="Start Group Session"
            onPress={handleStartSession}
            style={[styles.button, styles.primaryButton]}
          />
          <SecondaryButton textType="bodyEmphasized" text="Invite Friend" onPress={handleInviteFriend} style={styles.button} />
        </View>

        <UIText type="secondaryTitle" color="label">
          Members
        </UIText>

        <ScrollView style={styles.membersList}>{group.members.map(renderMember)}</ScrollView>

        <View style={{ marginTop: 20, marginBottom: 40, marginHorizontal: 16 }}>
          <PrimaryButton
            isLoading={isLeaveGroupPending}
            textType="bodyEmphasized"
            type="danger"
            text="Leave Group"
            onPress={handleLeaveGroup}
            style={styles.button}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: 0,
  },
  primaryButton: {
    backgroundColor: colors.light.primary,
  },
  membersList: {
    borderWidth: 1,
    flex: 1,
    marginTop: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  memberPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
})
