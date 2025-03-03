import { PrimaryButton, TertiaryButton } from '@/components/ui/buttons/TextButtons'
import Modal, { ModalRef } from '@/components/ui/Modal/Modal'
import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import ViewHeader from '@/components/ui/ViewHeader'
import { colors } from '@/constants/colors'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import { useLeaveGroup } from '@/queries/groups/useLeaveGroup'
import { User } from '@/queries/users/userTypes'
import { ClientMessageType, CreateSessionWithGroupMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useWebsocketStore } from '@/zustand/websocketStore'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InviteToGroupView from '../invite-to-group/InviteToGroupView'
import LoadingView from '../loading/LoadingView'
import GroupInvitationView from '../group-invitation/GroupInvitationView'

export default function GroupView() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const insets = useSafeAreaInsets()
  const { sendMessage } = useWebsocketStore()
  const { data: group, isLoading: isGroupLoading } = useGetGroup(group_id)
  const { mutate: leaveGroup, isPending: isLeaveGroupPending } = useLeaveGroup()
  const theme = useColorScheme() ?? 'light'
  const inviteModalRef = useRef<ModalRef>(null)
  if (isGroupLoading) {
    return <LoadingView />
  }

  if (!group) {
    return <Redirect href="/not-found" />
  }

  const handleInviteFriend = () => inviteModalRef.current?.open()

  const handleStartSession = () => {
    const startSessionWithGroupMessage: UnsignedBaseClientMessage<CreateSessionWithGroupMessage> = {
      type: ClientMessageType.CREATE_SESSION_WITH_GROUP_MESSAGE_TYPE,
      group_id: group_id,
    }
    sendMessage(startSessionWithGroupMessage)
  }

  const handleLeaveGroup = () => {
    leaveGroup({ groupId: group_id })
  }

  const renderMemberAvatar = (member: User, index: number) => {
    const delay = index * 100

    return (
      <Animated.View entering={FadeInDown.delay(delay).springify()} key={member.id}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarImageContainer}>
            <Image source={{ uri: member.photo_url }} style={styles.avatarImage} resizeMode="cover" />
          </View>
        </View>
        <View style={styles.avatarNameContainer}>
          <UIText type="caption" color="secondaryLabel" style={{ textAlign: 'center' }}>
            {member.display_name.split(' ')[0]}
          </UIText>
        </View>
      </Animated.View>
    )
  }

  return (
    <UIView>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        <ViewHeader title={group.name} description={`${group.members.length} ${group.members.length === 1 ? 'Member' : 'Members'}`} />

        <View style={styles.content}>
          {/* Hero Section */}
          <Animated.View entering={FadeIn.delay(200)} style={styles.heroSection}>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={100} style={styles.heroBlur}>
                <HeroContent theme={theme} />
              </BlurView>
            ) : (
              <View style={[styles.heroBlur, { backgroundColor: colors[theme].elevatedBackground }]}>
                <HeroContent theme={theme} />
              </View>
            )}
          </Animated.View>

          {/* Members Section */}
          <View style={styles.membersSection}>
            <UIText type="secondaryTitleEmphasized" color="label" style={styles.sectionTitle}>
              Members
            </UIText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarsContainer}>
              {group.members.map((member, index) => renderMemberAvatar(member, index))}

              <Animated.View entering={FadeInDown.delay(group.members.length * 100).springify()}>
                <Pressable onPress={handleInviteFriend} style={[styles.addAvatarContainer]}>
                  <View style={styles.addIconContainer}>
                    <Ionicons name="person-add" size={24} color={colors[theme].primary} />
                  </View>
                </Pressable>
                <View style={styles.avatarNameContainer}>
                  <UIText type="caption" color="primary" style={{ textAlign: 'center' }}>
                    Invite
                  </UIText>
                </View>
              </Animated.View>
            </ScrollView>

            {/* Action Buttons */}
            <Animated.View entering={FadeInUp.delay(400)} style={styles.actionButtonsContainer}>
              <PrimaryButton
                textType="bodyEmphasized"
                text="Start Session"
                onPress={handleStartSession}
                style={styles.startButton}
                leftIcon={<Ionicons name="play" size={18} color="white" />}
              />
            </Animated.View>
          </View>

          {/* Leave Group Button */}
          <Animated.View entering={FadeInUp.delay(500)} style={styles.leaveGroupContainer}>
            <TertiaryButton
              isLoading={isLeaveGroupPending}
              textType="callout"
              type="danger"
              text="Leave Group"
              onPress={handleLeaveGroup}
            />
          </Animated.View>
        </View>
      </View>
      <Modal ref={inviteModalRef}>
        <InviteToGroupView groupId={group_id} />
      </Modal>
    </UIView>
  )
}

const HeroContent = ({ theme }: { theme: 'light' | 'dark' }) => (
  <View style={styles.heroContent}>
    <View style={styles.heroIconContainer}>
      <Ionicons name="people" size={32} color={colors[theme].primary} />
    </View>
    <UIText type="calloutEmphasized" color="label" style={{ textAlign: 'center' }}>
      Ready to find a place to eat together?
    </UIText>
    <UIText type="caption" color="secondaryLabel" style={{ textAlign: 'center' }}>
      Start a session with your group or invite more friends
    </UIText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  heroSection: {
    marginVertical: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  heroBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  heroContent: {
    padding: 20,
    alignItems: 'center',
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,122,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  membersSection: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  avatarsContainer: {
    paddingVertical: 8,
    gap: 16,
    paddingHorizontal: 4,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderColor: 'transparent',
    borderWidth: 3,
    padding: 2,
  },
  avatarImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    overflow: 'hidden',
  },
  addAvatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,122,255,0.1)',
  },
  addIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarNameContainer: {
    marginTop: 4,
    alignItems: 'center',
    width: 70,
  },
  actionButtonsContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  startButton: {
    borderRadius: 16,
    paddingVertical: 16,
  },
  leaveGroupContainer: {
    marginTop: 'auto',
    marginBottom: 24,
    alignItems: 'center',
  },
})
