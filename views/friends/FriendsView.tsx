import Modal, { ModalRef } from '@/components/ui/Modal/Modal'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { GeneralButton } from '@/components/ui/buttons/Buttons'
import { updateFriendRequestAtom } from '@/jotai/updateFriendRequestAtom'
import { FriendRequest } from '@/queries/friendRequests/friendRequestsTypes'
import { useGetReceivedFriendRequests } from '@/queries/friendRequests/useGetReceivedFriendRequests'
import { useGetSentFriendRequests } from '@/queries/friendRequests/useGetSentFriendRequests'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { useGetPublicId } from '@/queries/users/useGetPublicId'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React, { useCallback, useRef } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FriendCard from './components/FriendCard'
import NewFriendButton from './components/NewFriendButton'
import NewFriendModal from './components/NewFriendModal'

export default function FriendsView() {
  const insets = useSafeAreaInsets()
  const [, setUpdateFriendRequest] = useAtom(updateFriendRequestAtom)
  const { data: friends, refetch: refetchFriends, isRefetching: isRefetchingFriends } = useGetUserFriends()
  const { data: sentRequests, refetch: refetchSentRequests, isRefetching: isRefetchingSentRequests } = useGetSentFriendRequests()
  const {
    data: receivedRequests,
    refetch: refetchReceivedRequests,
    isRefetching: isRefetchingReceivedRequests,
  } = useGetReceivedFriendRequests()
  const { data: publicId } = useGetPublicId()
  const modalRef = useRef<ModalRef>(null)
  const requestModalRef = useRef<ModalRef>(null)

  const onRefresh = useCallback(() => {
    refetchFriends()
    refetchSentRequests()
    refetchReceivedRequests()
  }, [refetchFriends, refetchSentRequests, refetchReceivedRequests])

  function handleFriendRequestCardPress(request: FriendRequest) {
    setUpdateFriendRequest({
      friendRequest: request,
      direction: 'received',
    })
    if (requestModalRef.current) {
      requestModalRef.current.open()
    }
  }

  const isRefreshing = isRefetchingFriends || isRefetchingSentRequests || isRefetchingReceivedRequests

  return (
    <UIView>
      <View style={{ flex: 1, paddingTop: insets.top + 16 }}>
        <ViewHeader title="Your Friends" description="Manage your friends and requests">
          <NewFriendButton
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
              <UIText type="titleEmphasized">Friend Requests</UIText>
            </View>
            {receivedRequests && receivedRequests.length > 0 && (
              <View style={{ gap: 10 }}>
                {receivedRequests.map((request, index) => (
                  <View key={index}>
                    <FriendCard friend={request} onPress={() => handleFriendRequestCardPress(request)} />
                    <Modal ref={requestModalRef}>
                      <View style={{ padding: 20 }}>
                        <UIText type="title">Friend Request</UIText>
                        <UIText type="body">Viewing friend request details</UIText>
                        <GeneralButton onPress={() => requestModalRef.current?.close()}>
                          <UIText type="body" color="label">
                            Close
                          </UIText>
                        </GeneralButton>
                      </View>
                    </Modal>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={{ marginBottom: 30 }}>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Sent Requests</UIText>
            </View>
            {sentRequests && sentRequests.length > 0 ? (
              <View style={{ gap: 10 }}>
                {sentRequests.map((request, index) => (
                  <FriendCard
                    key={index}
                    friend={request}
                    onPress={() => {
                      setUpdateFriendRequest({
                        friendRequest: request,
                        direction: 'sent',
                      })
                      router.push('/(auth)/update-friend-request')
                    }}
                  />
                ))}
              </View>
            ) : (
              <View style={{ alignItems: 'center', padding: 20 }}>
                <UIText type="body" color="secondaryLabel">
                  You haven't sent any friend requests
                </UIText>
              </View>
            )}
          </View>

          <View>
            <View style={{ marginBottom: 15 }}>
              <UIText type="titleEmphasized">Your Friends</UIText>
            </View>
            {friends && friends.length > 0 ? (
              <View style={{ gap: 10 }}>
                {friends.map((friend, index) => (
                  <FriendCard key={index} friend={friend} onPress={() => {}} />
                ))}
              </View>
            ) : (
              <View style={{ alignItems: 'center', padding: 20 }}>
                <UIText type="body" color="secondaryLabel">
                  You haven't added any friends yet
                </UIText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <Modal ref={modalRef}>
        <NewFriendModal publicId={publicId} />
      </Modal>
    </UIView>
  )
}
