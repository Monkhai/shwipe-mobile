import { View, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import NotFoundView from '../not-found/NotFoundView'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { User } from '@/queries/users/userTypes'

export default function GroupView() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const router = useRouter()
  const group = useGetGroup(group_id)
  const theme = useColorScheme() ?? 'light'

  if (!group) {
    return <Redirect href="/+not-found" />
  }

  const handleInviteFriend = () => {
    router.push(`/${group_id}/invite-to-group`)
  }

  const handleStartSession = () => {
    // To be implemented
    console.log('Start session clicked')
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
      <View style={[styles.container, { backgroundColor: colors[theme].background }]}>
        <View style={styles.header}>
          <UIText type="title" color="label">
            {group.name}
          </UIText>
          <UIText type="caption" color="secondaryLabel">
            {`${group.members.length} ${group.members.length === 1 ? 'Member' : 'Members'}`}
          </UIText>
        </View>

        <View style={styles.actionButtons}>
          <PrimaryButton text="Invite Friend" onPress={handleInviteFriend} style={styles.button} />
          <PrimaryButton text="Start Group Session" onPress={handleStartSession} style={[styles.button, styles.primaryButton]} />
        </View>

        <UIText type="secondaryTitle" color="label">
          Members
        </UIText>

        <ScrollView style={styles.membersList}>{group.members.map(renderMember)}</ScrollView>
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
    marginBottom: 24,
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
