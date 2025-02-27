import { AnimatedPressable } from '@/components/ui/buttons/AnimatedPressable'
import { GeneralButton } from '@/components/ui/buttons/TextButtons'
import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { useDeleteAccount } from '@/queries/users/useDeleteAccount'
import { Ionicons } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Alert, Platform, useColorScheme, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  measure,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

interface Props {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}
export default function HomeMenu({ showMenu, setShowMenu }: Props) {
  const ref = useAnimatedRef()
  const theme = useColorScheme() ?? 'light'
  const height = useSharedValue(44)
  const width = useSharedValue(44)
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

  useAnimatedReaction(
    () => measure(ref),
    m => {
      if (!m) return
      if (Platform.OS === 'android') {
        if (m.height > 44) {
          height.value = m.height + 2
          width.value = m.width + 2
        } else {
          height.value = withTiming(m.height + 2)
          width.value = withTiming(m.width + 2)
        }
      } else {
        height.value = withTiming(m.height + 6)
        width.value = withTiming(m.width + 6)
      }
    },
    [showMenu]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    width: width.value,
  }))

  return (
    <Animated.View
      ref={ref}
      layout={LinearTransition}
      style={[
        {
          position: 'absolute',
          right: 16,
          top: insets.top + 16,
          borderRadius: 24,
          minWidth: 44,
          minHeight: 44,
          zIndex: showMenu ? 3 : 1,
          overflow: 'hidden',
          backgroundColor: colors[theme].platformMaterial,
        },
      ]}
    >
      {Platform.OS === 'ios' && (
        <AnimatedBlurView
          intensity={Platform.select({
            ios: 80,
            android: 60,
          })}
          tint={Platform.select({
            ios: undefined,
            android: theme === 'light' ? 'systemThickMaterial' : 'systemThickMaterialDark',
          })}
          experimentalBlurMethod="dimezisBlurView"
          style={[{ position: 'absolute', width: 44, height: 44, left: 0, right: 0, top: 0, bottom: 0 }, animatedStyle]}
        />
      )}
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
          <Ionicons
            name="menu-outline"
            size={22}
            color={Platform.select({
              ios: colors[theme].white,
              android: colors[theme].label,
            })}
          />
        </AnimatedPressable>
      )}
      {showMenu && (
        <Animated.View style={{ flex: 1, padding: PADDING, gap: GAP, width: 200 }} entering={FadeIn} exiting={FadeOut}>
          <GeneralButton
            onPressIn={() => router.push('/(auth)/friends')}
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }}
            onPress={() => setShowMenu(false)}
          >
            <Ionicons
              name="people-outline"
              size={20}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="body"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
              Friends
            </UIText>
          </GeneralButton>
          <GeneralButton
            onPressIn={() => router.push('/(auth)/groups')}
            style={{ height: 32, flexDirection: 'row', alignItems: 'center', gap: 8 }}
            onPress={() => setShowMenu(false)}
          >
            <Ionicons
              name="people-circle-outline"
              size={20}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="body"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
            <Ionicons
              name="log-out-outline"
              size={20}
              color={Platform.select({
                ios: colors[theme].white,
                android: colors[theme].label,
              })}
            />
            <UIText
              type="body"
              color={Platform.select({
                ios: 'white',
                android: 'label',
              })}
            >
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
