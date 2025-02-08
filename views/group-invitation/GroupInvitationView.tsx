import { PrimaryButton, SecondaryButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { GroupInvitationStatus } from '@/queries/groups/groupTypes'
import { useGetGroupInvitation } from '@/queries/groups/useGetGroupInvitation'
import { useUpdateGroupInvitation } from '@/queries/groups/useUpdateGroupInvitation'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LoadingView from '../loading/LoadingView'

export default function GroupInvitationView() {
  const insets = useSafeAreaInsets()
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const { data: groupInvitation, isLoading } = useGetGroupInvitation(group_id)
  const { mutate: updateGroupInvitation, isPending } = useUpdateGroupInvitation()
  const theme = useColorScheme() ?? 'light'

  if (isLoading) {
    return <LoadingView />
  }

  if (!groupInvitation) {
    return <Redirect href="/not-found" />
  }

  function handleJoin() {
    if (!groupInvitation) return
    updateGroupInvitation({ groupId: groupInvitation.id, status: GroupInvitationStatus.ACCEPTED })
  }

  function handleDecline() {
    if (!groupInvitation) return
    updateGroupInvitation({ groupId: groupInvitation.id, status: GroupInvitationStatus.REJECTED })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].background, paddingTop: insets.top }]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <UIText type="largeTitle">Join {groupInvitation.name}</UIText>
          <View style={{ marginTop: 8 }}>
            <UIText type="body" color="secondaryLabel">
              You've been invited to join this group and swipe together
            </UIText>
          </View>
        </View>

        {/* Members */}
        <View style={styles.membersSection}>
          <UIText type="calloutEmphasized" color="secondaryLabel">
            Members ({groupInvitation.members.length})
          </UIText>

          <View style={styles.membersList}>
            {groupInvitation.members.map((member, i) => (
              <View key={i} style={[styles.memberCard, { backgroundColor: colors[theme].elevatedBackground }]}>
                <Image source={{ uri: member.photo_url }} style={styles.memberPhoto} />
                <View style={styles.memberInfo}>
                  <UIText type="body">{member.display_name}</UIText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <PrimaryButton style={{ flex: 1 }} text="Join Group" textType="bodyEmphasized" onPress={handleJoin} isLoading={isPending} />
        <SecondaryButton
          style={{ flex: 1 }}
          type="danger"
          text="Decline"
          textType="bodyEmphasized"
          onPress={handleDecline}
          isLoading={isPending}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  membersSection: {
    gap: 16,
  },
  membersList: {
    gap: 8,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 32,
    gap: 8,
  },
  button: {
    flex: 1,
  },
})
