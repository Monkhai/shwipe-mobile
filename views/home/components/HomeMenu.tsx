import { AnimatedPressable } from '@/components/ui/buttons/AnimatedPressable'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { useDeleteAccount } from '@/queries/users/useDeleteAccount'
import { Ionicons } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Alert, useColorScheme, View } from 'react-native'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}
export default function HomeMenu({ showMenu, setShowMenu }: Props) {
  const theme = useColorScheme() ?? 'light'
  const insets = useSafeAreaInsets()
  const { mutate: deleteAccount, isPending } = useDeleteAccount()
  const PADDING = 16
  const GAP = 12

  function handleDeleteAccount() {
    setShowMenu(false)
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action is irreversible.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteAccount() },
    ])
  }

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        {
          position: 'absolute',
          right: 16,
          top: insets.top + 16,
          backgroundColor: colors[theme].definedMaterial,
          borderRadius: 24,
          minWidth: 44,
          minHeight: 44,
          zIndex: 3,
          overflow: 'hidden',
        },
      ]}
    >
      {!showMenu && (
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setShowMenu(!showMenu)
          }}
        >
          <Ionicons name="menu-outline" size={22} color={colors[theme].white} />
        </AnimatedPressable>
      )}
      {showMenu && (
        <Animated.View style={{ flex: 1, padding: PADDING, gap: GAP, width: 200 }} entering={FadeIn} exiting={FadeOut}>
          <GeneralButton
            onPressIn={() => router.push('/(auth)/friends')}
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }}
            onPress={() => setShowMenu(false)}
          >
            <Ionicons name="people-outline" size={20} color={colors[theme].white} />
            <UIText type="body" color="white">
              Friends
            </UIText>
          </GeneralButton>
          <GeneralButton
            onPressIn={() => router.push('/(auth)/groups')}
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }}
            onPress={() => setShowMenu(false)}
          >
            <Ionicons name="people-circle-outline" size={20} color={colors[theme].white} />
            <UIText type="body" color="white">
              Groups
            </UIText>
          </GeneralButton>
          <GeneralButton
            onPress={() => {
              setShowMenu(false)
              void auth().signOut()
            }}
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }}
          >
            <Ionicons name="log-out-outline" size={20} color={colors[theme].white} />
            <UIText type="body" color="white">
              Logout
            </UIText>
          </GeneralButton>
          <GeneralButton
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={handleDeleteAccount}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="trash-outline" size={20} color={colors[theme].secondaryDanger} />
              <UIText type="body" color="secondaryDanger" style={{ color: colors[theme].secondaryDanger }}>
                Delete account
              </UIText>
            </View>
            {isPending && <ActivityIndicator size="small" color={colors[theme].secondaryDanger} />}
          </GeneralButton>
        </Animated.View>
      )}
    </Animated.View>
  )
}
