import signInWIthGoogle from '@/assets/auth/google.png'
import { useGetOnboardingData } from '@/asyncStorage/storageStore'
import { useAuth } from '@/providers/AuthProvider'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, isErrorWithCode } from '@react-native-google-signin/google-signin'
import { Redirect } from 'expo-router'
import React from 'react'
import { Image, Pressable, View } from 'react-native'
import LoadingView from '../loading/LoadingView'

const SIGN_IN_WITH_GOOGLE_IMAGE = Image.resolveAssetSource(signInWIthGoogle)

async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const signInResult = await GoogleSignin.signIn()

    if (!signInResult.data) {
      throw new Error('No data found')
    }
    const idToken = signInResult.data.idToken
    if (!idToken) {
      throw new Error('No ID token found')
    }

    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken)
    await auth().signInWithCredential(googleCredential)
  } catch (error) {
    if (isErrorWithCode(error)) {
      console.log(error.message)
    }
  }
}
const webClientId = '684959533733-kq14vetk1vfl6cq7do52djf1e7gm8iar.apps.googleusercontent.com'

export default function LoginView() {
  GoogleSignin.configure({ webClientId })
  const [user] = useAuth()

  if (user) {
    return <Redirect href="/(auth)/home" />
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={onGoogleButtonPress}>
        <Image source={{ uri: SIGN_IN_WITH_GOOGLE_IMAGE.uri }} style={{ width: 300, height: 54, resizeMode: 'contain' }} />
      </Pressable>
    </View>
  )
}
