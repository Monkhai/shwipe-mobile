import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { PrimaryButton } from '@/components/ui/buttons/Buttons'
import { colors } from '@/constants/colors'
import { useSendFriendRequest } from '@/queries/friendRequests/useSendFriendRequest'
import { useUpdateFriendRequest } from '@/queries/friendRequests/useUpdateFriendRequest'
import { useRemoveFriendship } from '@/queries/friends/useRemoveFriendship'
import { useGetUser } from '@/queries/users/useGetUser'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, SlideInDown, SlideInUp, ZoomIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Get screen dimensions for responsive layouts
const { width, height } = Dimensions.get('window')

export default function NewFriendView() {
  const insets = useSafeAreaInsets()
  const { friend_id } = useLocalSearchParams<{ friend_id: string }>()
  const { data: user, isLoading: isUserLoading, error: userError } = useGetUser(friend_id)
  const { mutate: sendFriendRequest, isPending, isSuccess, isError, error } = useSendFriendRequest()
  const {
    mutate: removeFriendship,
    isPending: isRemoveFriendshipPending,
    isSuccess: isRemoveFriendshipSuccess,
    isError: isRemoveFriendshipError,
    error: removeFriendshipError,
  } = useRemoveFriendship()

  const theme = useColorScheme() ?? 'light'
  const [requestSent, setRequestSent] = useState(false)
  const [friendRemoved, setFriendRemoved] = useState(false)

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

    removeFriendship(
      { friendId: friend_id },
      {
        onSuccess: () => {
          setFriendRemoved(true)
        },
      }
    )
  }

  const paddingTop = insets.top + 16

  console.log(user?.isFriend)

  if (isUserLoading) {
    return (
      <UIView>
        <View style={{ paddingTop, flex: 1 }}>
          <ViewHeader title="Add Friend" description="Send a friend request" backButton />
          <Animated.View entering={FadeIn.delay(300).duration(600)} style={[styles.loadingContainer]}>
            <ActivityIndicator size="large" color={colors[theme].primary} />
            <UIText type="body" color="secondaryLabel" style={styles.loadingText}>
              Loading user information...
            </UIText>
          </Animated.View>
        </View>
      </UIView>
    )
  }

  if (userError || !user) {
    return (
      <UIView>
        <View style={{ paddingTop, flex: 1 }}>
          <ViewHeader title="Add Friend" description="Send a friend request" backButton />
          <Animated.View entering={FadeIn.delay(300).duration(600)} style={[styles.errorContainer]}>
            <Animated.View entering={ZoomIn.delay(500).duration(600)}>
              <Ionicons name="alert-circle" size={60} color={colors[theme].danger} />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(700).duration(500)}>
              <UIText type="secondaryTitle" color="danger" style={styles.errorTitle}>
                User Not Found
              </UIText>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(800).duration(500)}>
              <UIText type="body" color="secondaryLabel" style={styles.errorText}>
                We couldn't find this user. They may have deleted their account or the link is invalid.
              </UIText>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(900).duration(500)}>
              <PrimaryButton text="Go Back" style={styles.button} onPress={() => router.back()} />
            </Animated.View>
          </Animated.View>
        </View>
      </UIView>
    )
  }

  return (
    <UIView>
      <View style={{ paddingTop, flex: 1 }}>
        <ViewHeader
          title={user?.isFriend ? 'Friend' : 'Add Friend'}
          description={user?.isFriend ? 'Manage friendship' : 'Send a friend request'}
          backButton
        />
        <Animated.View entering={FadeIn.delay(300).duration(600)} style={[styles.userContainer]}>
          {isSuccess || requestSent ? (
            <Animated.View entering={FadeIn.duration(600)} style={styles.cardContainer}>
              <View style={styles.successIconContainer}>
                <Animated.View entering={ZoomIn.delay(300).duration(800)}>
                  <Ionicons name="checkmark-circle" size={80} color={colors[theme].success} />
                </Animated.View>
              </View>
              <Animated.View entering={FadeInDown.delay(500).duration(500)}>
                <UIText type="titleEmphasized" style={styles.successTitle}>
                  Friend Request Sent!
                </UIText>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(600).duration(500)}>
                <UIText type="body" color="secondaryLabel" style={styles.successText}>
                  Your friend request has been sent to {user.display_name}. They'll need to accept it before you can share restaurant
                  recommendations.
                </UIText>
              </Animated.View>
              <Animated.View entering={SlideInUp.delay(800).duration(500)}>
                <PrimaryButton text="Back to Friends" style={styles.button} onPress={() => router.back()} />
              </Animated.View>
            </Animated.View>
          ) : friendRemoved ? (
            <Animated.View entering={FadeIn.duration(600)} style={styles.cardContainer}>
              <View style={styles.successIconContainer}>
                <Animated.View entering={ZoomIn.delay(300).duration(800)}>
                  <Ionicons name="checkmark-circle" size={80} color={colors[theme].success} />
                </Animated.View>
              </View>
              <Animated.View entering={FadeInDown.delay(500).duration(500)}>
                <UIText type="titleEmphasized" style={styles.successTitle}>
                  Friend Removed
                </UIText>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(600).duration(500)}>
                <UIText type="body" color="secondaryLabel" style={styles.successText}>
                  You are no longer friends with {user.display_name}. You can send a new friend request at any time.
                </UIText>
              </Animated.View>
              <Animated.View entering={SlideInUp.delay(800).duration(500)}>
                <PrimaryButton text="Back to Friends" style={styles.button} onPress={() => router.back()} />
              </Animated.View>
            </Animated.View>
          ) : (
            <>
              <Animated.View entering={FadeIn.duration(600)} style={styles.cardContainer}>
                <View style={styles.profileImageContainer}>
                  <Animated.Image
                    entering={ZoomIn.delay(300).duration(800)}
                    source={{ uri: user.photo_url || 'https://via.placeholder.com/150' }}
                    style={styles.userImage}
                  />
                </View>
                <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.userTextContainer}>
                  <UIText type="titleEmphasized" style={styles.userName}>
                    {user.display_name}
                  </UIText>
                  <UIText type="body" color="secondaryLabel" style={styles.userDesc}>
                    {user.isFriend
                      ? `${user.display_name} is already your friend. You can share restaurant recommendations with them.`
                      : `Send a friend request to start sharing restaurant recommendations with ${user.display_name}.`}
                  </UIText>
                </Animated.View>

                <Animated.View entering={SlideInDown.delay(800).duration(500)} style={styles.buttonContainer}>
                  {user.isFriend ? (
                    <PrimaryButton text="Remove Friend" type="danger" style={styles.button} onPress={handleRemoveFriend} />
                  ) : (
                    <PrimaryButton
                      text="Send Friend Request"
                      style={styles.button}
                      isLoading={isPending}
                      onPress={handleSendFriendRequest}
                    />
                  )}
                </Animated.View>
              </Animated.View>

              {isError && (
                <Animated.View entering={SlideInUp.duration(400)} style={styles.errorBanner}>
                  <UIText type="body" color="white">
                    {error?.message || 'There was an error sending the friend request. Please try again.'}
                  </UIText>
                </Animated.View>
              )}
            </>
          )}
        </Animated.View>
      </View>
    </UIView>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: Math.min(width * 0.9, 450),
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  profileImageContainer: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: colors.light.secondaryBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  userInfoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  userImage: {
    width: Math.min(width * 0.35, 130),
    height: Math.min(width * 0.35, 130),
    borderRadius: Math.min(width * 0.35, 130) / 2,
  },
  userTextContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
    marginBottom: 24,
  },
  userName: {
    marginBottom: 12,
    textAlign: 'center',
  },
  userDesc: {
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginTop: 8,
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
    maxWidth: 400,
    paddingHorizontal: width > 400 ? 40 : 20,
  },
  errorBanner: {
    backgroundColor: colors.light.danger,
    padding: 16,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    marginTop: 20,
    alignItems: 'center',
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successIconContainer: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.light.secondaryBackground,
  },
  successTitle: {
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
})
