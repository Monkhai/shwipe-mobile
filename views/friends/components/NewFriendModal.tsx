import UIText from '@/components/ui/UIText'
import { colors } from '@/constants/colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { GeneralButton } from '@/components/ui/buttons/Buttons'
import QrCode from 'react-native-qrcode-svg'
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'

interface Props {
  publicId: string | undefined
}
export default function NewFriendModal({ publicId }: Props) {
  const theme = useColorScheme() ?? 'light'
  const [showQR, setShowQR] = useState(false)

  function handleSearchPress() {}
  function handleScanQRPress() {}
  function handleShowQRPress() {
    setShowQR(!showQR)
  }

  const link = useMemo(() => {
    return `shwipe://new-friend/${publicId}`
  }, [publicId])

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      <UIText type="largeTitle">Add Friends</UIText>

      {showQR && (
        <Animated.View layout={LinearTransition} entering={FadeIn} exiting={FadeOut}>
          <QrCode value={link} size={150} />
        </Animated.View>
      )}

      <Animated.View layout={LinearTransition} style={styles.contentContainer}>
        <View style={styles.mainButtonsContainer}>
          <GeneralButton style={styles.mainButton} onPress={handleScanQRPress}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="qr-code-scanner" size={20} color={colors[theme].label} />
            </View>
            <UIText type="footnote" color="label" style={styles.buttonText}>
              Scan QR
            </UIText>
          </GeneralButton>
          <GeneralButton style={styles.mainButton} onPress={handleShowQRPress}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="qr-code" size={20} color={colors[theme].label} />
            </View>
            <UIText type="footnote" color="label" style={styles.buttonText}>
              Your QR
            </UIText>
          </GeneralButton>
        </View>
        {/* Divider */}
        <View style={styles.divider} />
        {/* Secondary Search Option */}
        <GeneralButton style={styles.searchButton} onPress={handleSearchPress}>
          <Ionicons name="search" size={16} color={colors[theme].secondaryLabel} />
          <UIText type="caption" color="secondaryLabel" style={{ marginLeft: 6 }}>
            Search by username
          </UIText>
        </GeneralButton>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 24,
    marginBottom: 16,
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginVertical: 12,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
})
