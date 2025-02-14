import AddGroup from '@/components/shapes/AddGroup'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { useGetGroupInvitations } from '@/queries/groups/useGetGroupInvitations'
import { useGetGroups } from '@/queries/groups/useGetGroups'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { Keyboard, Platform, RefreshControl, ScrollView, useColorScheme, View } from 'react-native'
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GroupCard from '../../components/groups/GroupCard/GroupCard'
import NewGroupView from '../new-group/NewGroupView'
import { BlurView } from 'expo-blur'

export default function GroupsView() {
  const insets = useSafeAreaInsets()
  const { data: groupInvitations, refetch: refetchGroupInvitations, isRefetching: isRefetchingGroupInvitations } = useGetGroupInvitations()
  const { data: groups, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()
  const ref = useRef<BottomSheet>(null)

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
          <PlusButton onPress={() => ref.current?.snapToIndex(0)} />
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
      <BottomSheet
        ref={ref}
        index={-1}
        backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.1} />}
        snapPoints={['40%']}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        handleComponent={null}
        enableDynamicSizing={false}
        enablePanDownToClose
        enableBlurKeyboardOnGesture
        backgroundStyle={{ backgroundColor: 'transparent' }}
      >
        <BottomSheetView
          style={{ flex: 1, marginHorizontal: 20, marginBottom: Platform.select({ android: 40 + insets.bottom, ios: insets.bottom }) }}
        >
          <NewGroupView />
        </BottomSheetView>
      </BottomSheet>
    </UIView>
  )
}

function PlusButton({ onPress }: { onPress: () => void }) {
  const theme = useColorScheme() ?? 'light'

  return (
    <Animated.View layout={LinearTransition} entering={ZoomIn} exiting={ZoomOut}>
      <GeneralButton onPress={onPress} hitSlop={24} style={{ borderRadius: 100, backgroundColor: colors[theme].material }}>
        <AddGroup />
      </GeneralButton>
    </Animated.View>
  )
}
