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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Button,
  Keyboard,
  KeyboardEvent,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native'
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GroupCard from '../../components/groups/GroupCard/GroupCard'
import NewGroupView from '../new-group/NewGroupView'

export default function GroupsView() {
  const insets = useSafeAreaInsets()
  const { data: groupInvitations, refetch: refetchGroupInvitations, isRefetching: isRefetchingGroupInvitations } = useGetGroupInvitations()
  const { data: groups, refetch: refetchGroups, isRefetching: isRefetchingGroups } = useGetGroups()
  const ref = useRef<BottomSheet>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  // Platform-specific settings
  const snapPoints = useMemo(() => {
    return Platform.OS === 'android' ? ['45%'] : ['40%']
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e: KeyboardEvent) => {
        setKeyboardVisible(true)
        // Remove the automatic snap point adjustment for now
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
      setKeyboardVisible(false)
      // Remove the automatic snap point adjustment for now
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [isBottomSheetOpen])

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

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index !== -1)
  }, [])

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  const closeBottomSheet = useCallback(() => {
    if (ref.current) {
      ref.current.close()
    }
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.1} pressBehavior="close" />,
    []
  )

  return (
    <UIView>
      {isBottomSheetOpen && isKeyboardVisible && Platform.OS === 'ios' && (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      <View style={{ flex: 1, paddingTop: insets.top + 16 }}>
        <ViewHeader title="Your Groups" description="Manage and join groups with your friends">
          <PlusButton
            onPress={() => {
              if (ref.current) {
                ref.current.snapToIndex(0)
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

      <BottomSheet
        ref={ref}
        index={-1}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        handleComponent={null}
        enableDynamicSizing={false}
        enablePanDownToClose
        enableBlurKeyboardOnGesture={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: 'transparent',
          marginHorizontal: 16,
          marginBottom: Platform.OS === 'android' ? 16 : 0,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <BottomSheetView style={{ backgroundColor: 'transparent' }}>
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
      <GeneralButton onPress={onPress} hitSlop={24} style={{ borderRadius: 100, backgroundColor: colors[theme].thickMaterial }}>
        <AddGroup />
      </GeneralButton>
    </Animated.View>
  )
}
