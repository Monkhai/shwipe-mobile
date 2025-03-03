import Modal, { ModalRef } from '@/components/ui/Modal/Modal'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { useGetGroupInvitations } from '@/queries/groups/useGetGroupInvitations'
import { useGetGroups } from '@/queries/groups/useGetGroups'
import { router } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GroupInvitationView from '../group-invitation/GroupInvitationView'
import NewGroupView from '../new-group/NewGroupView'
import GroupCard from './components/GroupCard'
import NewGroupButton from './components/NewGroupButton'

export default function GroupsView() {
  const insets = useSafeAreaInsets()
  const { data: groupInvitations, refetch: refetchGroupInvitations, isRefetching: isRefetchingGroupInvitations } = useGetGroupInvitations()
  const { data: groups, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()
  const modalRef = useRef<ModalRef>(null)
  const invitationModalRef = useRef<ModalRef>(null)
  const onRefresh = useCallback(() => {
    refetchGroups()
    refetchGroupInvitations()
  }, [refetchGroups, refetchGroupInvitations])

  function handleGroupCardPress(groupId: string) {
    router.push(`/(auth)/${groupId}`)
  }

  function handleGroupInvitationCardPress(groupId: string) {
    if (invitationModalRef.current) {
      invitationModalRef.current.open()
    }
  }

  const isRefreshing = isRefetchingGroups || isRefetchingGroupInvitations

  return (
    <UIView>
      <View style={{ flex: 1, paddingTop: insets.top + 16 }}>
        <ViewHeader title="Your Groups" description="Manage and join groups with your friends">
          <NewGroupButton
            onPress={() => {
              if (modalRef.current) {
                modalRef.current.open()
              }
            }}
          />
        </ViewHeader>
        <ScrollView
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
        >
          <View style={{ marginBottom: 30 }}>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Group Invitations</UIText>
            </View>
            {groupInvitations && groupInvitations.length > 0 && (
              <View style={{ gap: 10 }}>
                {groupInvitations.map(invitation => (
                  <View key={invitation.invitation_id}>
                    <GroupCard key={invitation.invitation_id} group={invitation} onPress={handleGroupInvitationCardPress} />
                    <Modal ref={invitationModalRef}>
                      <GroupInvitationView groupId={invitation.id} onSuccess={() => modalRef.current?.close()} />
                    </Modal>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Your Groups</UIText>
            </View>
            {groups && groups.length > 0 ? (
              <View style={{ gap: 10 }}>
                {groups.map(group => (
                  <GroupCard key={group.id} group={group} onPress={handleGroupCardPress} />
                ))}
              </View>
            ) : (
              <View style={{ alignItems: 'center', padding: 20 }}>
                <UIText type="body" color="secondaryLabel">
                  You haven't joined any groups yet
                </UIText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <Modal ref={modalRef}>
        <NewGroupView
          onSuccess={() => {
            if (modalRef.current) {
              modalRef.current.close()
            }
          }}
        />
      </Modal>
    </UIView>
  )
}
