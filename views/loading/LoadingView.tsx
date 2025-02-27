import UIText from '@/components/ui/UIText'
import UIView from '@/components/ui/UIView'
import { colors } from '@/constants/colors'
import { BlurView } from 'expo-blur'
import React from 'react'
import { ActivityIndicator, Platform, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native'

type LoadingViewProps = {
  message?: string
  transparent?: boolean
}

export default function LoadingView({ message = 'Loading...', transparent = true }: LoadingViewProps) {
  const theme = useColorScheme() ?? 'light'

  if (transparent) {
    return (
      <UIView>
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color={colors[theme].primary} />
          {message && (
            <View style={styles.textContainer}>
              <UIText type="body" color="secondaryLabel">
                {message}
              </UIText>
            </View>
          )}
        </View>
      </UIView>
    )
  }

  const androidStyle: ViewStyle = {
    flex: 1,
    gap: 20,
    padding: 20,
    borderRadius: 32,
    backgroundColor: colors[theme].elevatedBackground,
  }

  if (Platform.OS === 'android') {
    return (
      <View style={androidStyle}>
        <View style={[styles.container]}>
          <ActivityIndicator size="large" color={colors[theme].primary} />
          {message && (
            <View style={styles.textContainer}>
              <UIText type="body" color="secondaryLabel">
                {message}
              </UIText>
            </View>
          )}
        </View>
      </View>
    )
  }

  const iosStyle: ViewStyle = {
    flex: 1,
    padding: 20,
    gap: 20,
    borderRadius: 32,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  }

  return (
    <BlurView intensity={80} style={iosStyle}>
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={colors[theme].primary} />
        {message && (
          <View style={styles.textContainer}>
            <UIText type="body" color="secondaryLabel">
              {message}
            </UIText>
          </View>
        )}
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 12,
  },
})
