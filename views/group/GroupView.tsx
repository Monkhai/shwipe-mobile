import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import ViewHeader from '@/components/ui/ViewHeader'
import { colors } from '@/constants/colors'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import { useLeaveGroup } from '@/queries/groups/useLeaveGroup'
import { User } from '@/queries/users/userTypes'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, useColorScheme, View } from 'react-native'
import LoadingView from '../loading/LoadingView'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { ClientMessageType, CreateSessionWithGroupMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import UIView from '@/components/ui/UIView'

export default function GroupView() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const router = useRouter()
  const { sendMessage } = useWebsocketStore()
  const { data: group, isLoading: isGroupLoading } = useGetGroup(group_id)
  const { mutate: leaveGroup, isPending: isLeaveGroupPending } = useLeaveGroup()
  const theme = useColorScheme() ?? 'light'

  if (isGroupLoading) {
    return <LoadingView />
  }

  if (!group) {
    return <Redirect href="/not-found" />
  }

  const handleInviteFriend = () => {
    router.push(`/${group_id}/invite-to-group`)
  }

  const handleStartSession = () => {
    const startSessionWithGroupMessage: UnsignedBaseClientMessage<CreateSessionWithGroupMessage> = {
      type: ClientMessageType.CREATE_SESSION_WITH_GROUP_MESSAGE_TYPE,
      group_id: group_id,
    }
    sendMessage(startSessionWithGroupMessage)
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
    <UIView>
      <Stack.Screen options={{ title: group.name }} />
      <View style={styles.container}>
        <ViewHeader title={group.name} description={`${group.members.length} ${group.members.length === 1 ? 'Member' : 'Members'}`} />

        <View style={styles.actionButtons}>
          <PrimaryButton
            textType="bodyEmphasized"
            text="Start Session"
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
    </UIView>
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
