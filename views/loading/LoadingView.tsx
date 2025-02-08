import { View, ActivityIndicator, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'
import UIText from '@/components/ui/UIText'

type LoadingViewProps = {
  message?: string
}

export default function LoadingView({ message = 'Loading...' }: LoadingViewProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].background }]}>
      <ActivityIndicator size="large" color={colors[theme].primary} />
      {message && (
        <View style={styles.textContainer}>
          <UIText type="body" color="secondaryLabel">
            {message}
          </UIText>
        </View>
      )}
    </View>
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
