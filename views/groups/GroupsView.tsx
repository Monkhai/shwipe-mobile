import AddGroup from '@/components/shapes/AddGroup'
import Modal, { ModalRef } from '@/components/ui/Modal/Modal'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import { useGetGroupInvitations } from '@/queries/groups/useGetGroupInvitations'
import { useGetGroups } from '@/queries/groups/useGetGroups'
import { router } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { RefreshControl, ScrollView, useColorScheme, View } from 'react-native'
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GroupCard from '../../components/groups/GroupCard/GroupCard'
import NewGroupView from '../new-group/NewGroupView'

export default function GroupsView() {
  const insets = useSafeAreaInsets()
  const { data: groupInvitations, refetch: refetchGroupInvitations, isRefetching: isRefetchingGroupInvitations } = useGetGroupInvitations()
  const { data: groups, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()
  const modalRef = useRef<ModalRef>(null)

  const onRefresh = useCallback(() => {
    refetchGroups()
    refetchGroupInvitations()
  }, [refetchGroups, refetchGroupInvitations])

  function handleGroupCardPress(groupId: string) {
    router.push(`/(auth)/${groupId}`)
  }

  function handleGroupInvitationCardPress(groupId: string) {
    router.push(`/(auth)/${groupId}/group-invitation`)
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
            {groupInvitations &&
              groupInvitations.length > 0 &&
              groupInvitations.map(invitation => (
                <GroupCard key={invitation.invitation_id} group={invitation} onPress={handleGroupInvitationCardPress} />
              ))}
          </View>

          <View>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Your Groups</UIText>
            </View>
            {groups && groups.length > 0 ? (
              groups.map(group => <GroupCard key={group.id} group={group} onPress={handleGroupCardPress} />)
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
        <NewGroupView />
      </Modal>
    </UIView>
  )
}

function NewGroupButton({ onPress }: { onPress: () => void }) {
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View layout={LinearTransition} entering={ZoomIn} exiting={ZoomOut}>
      <GeneralButton onPress={onPress} hitSlop={24} style={{ borderRadius: 100 }}>
        <AddGroup />
      </GeneralButton>
    </Animated.View>
  )
}
