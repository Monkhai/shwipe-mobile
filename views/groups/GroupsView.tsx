import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import { useGetGroupInvitations } from '@/queries/groups/useGetGroupInvitations'
import { useGetGroups } from '@/queries/groups/useGetGroups'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GroupCard from './components/GroupCard'

export default function GroupsView() {
  const insets = useSafeAreaInsets()
  const { data: groupInvitations, refetch: refetchGroupInvitations, isRefetching: isRefetchingGroupInvitations } = useGetGroupInvitations()
  const { data: groups, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()

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
        <ScrollView
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
        >
          {/* Header Section */}
          <ViewHeader title="Your Groups" description="Manage and join groups with your friends" />

          {/* Quick Actions */}
          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  type="primary"
                  textType="bodyEmphasized"
                  text="Create Group"
                  onPress={() => router.push('/new-group')}
                  style={{ minWidth: undefined }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <SecondaryButton
                  text="Join Group"
                  textType="bodyEmphasized"
                  onPress={() => {
                    // TODO: Implement join group functionality
                    alert('Join group feature coming soon!')
                  }}
                  type="primary"
                  style={{ minWidth: undefined }}
                />
              </View>
            </View>
          </View>

          {/* Group Invitations Section */}
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

          {/* Groups Section */}
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
    </UIView>
  )
}
