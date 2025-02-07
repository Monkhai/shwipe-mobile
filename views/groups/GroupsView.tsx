import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback } from 'react'
import { useGetGroupInvitations } from '@/queries/groups/useGetGroupInvitations'
import { useGetGroups } from '@/queries/groups/useGetGroups'
import UIText from '@/components/ui/UIText'
import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import GroupCard from './components/GroupCard'
import { router } from 'expo-router'

export default function GroupsView() {
  const {
    data: groupInvitations,
    error: groupInvitationsError,
    refetch: refetchGroupInvitations,
    isRefetching: isRefetchingGroupInvitations,
  } = useGetGroupInvitations()
  const { data: groups, error: groupsError, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()

  const onRefresh = useCallback(() => {
    refetchGroups()
    refetchGroupInvitations()
  }, [refetchGroups, refetchGroupInvitations])

  const isRefreshing = isRefetchingGroups || isRefetchingGroupInvitations

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Header Section */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <UIText type="largeTitle">Your Groups</UIText>
          </View>
          <View>
            <UIText type="body" color="secondaryLabel">
              Manage and join groups with your friends
            </UIText>
          </View>
        </View>

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
        {groupInvitations && groupInvitations.length > 0 && (
          <View style={{ marginBottom: 30 }}>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Group Invitations</UIText>
            </View>
            {groupInvitations.map(invitation => (
              <GroupCard key={invitation.invitation_id} group={invitation} />
            ))}
          </View>
        )}

        {/* Groups Section */}
        <View>
          <View style={{ marginBottom: 15 }}>
            <UIText type="titleEmphasized">Your Groups</UIText>
          </View>
          {groups && groups.length > 0 ? (
            groups.map(group => <GroupCard key={group.id} group={group} />)
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
  )
}
