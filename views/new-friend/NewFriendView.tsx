import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import UIView from '@/components/ui/UIView'
import { useGetUser } from '@/queries/users/useGetUser'
import { useSendFriendRequest } from '@/queries/friendRequests/useSendFriendRequest'
import UIText from '@/components/ui/UIText'
import { PrimaryButton } from '@/components/ui/buttons/Buttons'
import { colors } from '@/constants/colors'
import { BlurView } from 'expo-blur'
import { Platform, useColorScheme } from 'react-native'
import ViewHeader from '@/components/ui/ViewHeader'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function NewFriendView() {
  const insets = useSafeAreaInsets()
  const { friend_id } = useLocalSearchParams<{ friend_id: string }>()
  const { data: user, isLoading: isUserLoading, error: userError } = useGetUser(friend_id)
  const { mutate: sendFriendRequest, isPending, isSuccess, isError, error } = useSendFriendRequest()
  const theme = useColorScheme() ?? 'light'
  const [requestSent, setRequestSent] = useState(false)

  const handleSendFriendRequest = () => {
    if (!friend_id) return

    sendFriendRequest(
      { publicId: friend_id },
      {
        onSuccess: () => {
          setRequestSent(true)
        },
      }
    )
  }

  const handleRemoveFriend = () => {
    if (!friend_id) return
  }

  const paddingTop = insets.top + 16

  if (isUserLoading) {
    return (
      <UIView>
        <View style={{ paddingTop, flex: 1 }}>
          <ViewHeader title="Add Friend" description="Send a friend request" backButton />
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator size="large" color={colors[theme].primary} />
            <UIText type="body" color="secondaryLabel" style={styles.loadingText}>
              Loading user information...
            </UIText>
          </View>
        </View>
      </UIView>
    )
  }

  if (userError || !user) {
    return (
      <UIView>
        <View style={{ paddingTop, flex: 1 }}>
          <ViewHeader title="Add Friend" description="Send a friend request" backButton />
          <View style={[styles.errorContainer]}>
            <Ionicons name="alert-circle" size={60} color={colors[theme].danger} />
            <UIText type="secondaryTitle" color="danger" style={styles.errorTitle}>
              User Not Found
            </UIText>
            <UIText type="body" color="secondaryLabel" style={styles.errorText}>
              We couldn't find this user. They may have deleted their account or the link is invalid.
            </UIText>
            <PrimaryButton text="Go Back" style={styles.button} onPress={() => router.back()} />
          </View>
        </View>
      </UIView>
    )
  }

  return (
    <UIView>
      <View style={{ paddingTop, flex: 1 }}>
        <ViewHeader title="Add Friend" description="Send a friend request" backButton />
        <View style={[styles.userContainer]}>
          {isSuccess || requestSent ? (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={60} color={colors[theme].success} />
              <UIText type="secondaryTitle" style={styles.successTitle}>
                Friend Request Sent!
              </UIText>
              <UIText type="body" color="secondaryLabel" style={styles.successText}>
                Your friend request has been sent to {user.display_name}. They'll need to accept it before you can share restaurant
                recommendations.
              </UIText>
              <PrimaryButton text="Back to Friends" style={styles.button} onPress={() => router.back()} />
            </View>
          ) : (
            <>
              <View style={styles.userInfoContainer}>
                <Image source={{ uri: user.photo_url || 'https://via.placeholder.com/150' }} style={styles.userImage} />
                <View style={styles.userTextContainer}>
                  <UIText type="titleEmphasized" style={styles.userName}>
                    {user.display_name}
                  </UIText>
                  <UIText type="body" color="secondaryLabel" style={styles.userDesc}>
                    Send a friend request to start sharing restaurant recommendations with {user.display_name}.
                  </UIText>
                </View>
              </View>

              {isError && (
                <View style={styles.errorBanner}>
                  <UIText type="body" color="white">
                    {error?.message || 'There was an error sending the friend request. Please try again.'}
                  </UIText>
                </View>
              )}

              {user.isFriend ? (
                <PrimaryButton text="Remove Friend" type="danger" style={styles.button} onPress={handleRemoveFriend} />
              ) : (
                <PrimaryButton text="Send Friend Request" style={styles.button} isLoading={isPending} onPress={handleSendFriendRequest} />
              )}
            </>
          )}
        </View>
      </View>
    </UIView>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userInfoContainer: {
    width: '100%',
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.light.primary,
  },
  userTextContainer: {
    alignItems: 'center',
  },
  userName: {
    marginBottom: 8,
  },
  userDesc: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '50%',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  errorBanner: {
    backgroundColor: colors.light.danger,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  successTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 24,
  },
})
