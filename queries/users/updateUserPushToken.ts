import functions from '@react-native-firebase/functions'
import { UPDATE_USER_PUSH_TOKEN_CFN } from './userTypes'

type UpdateUserPushTokenRequest = {
  pushToken: string
}

const fn = functions().httpsCallable<UpdateUserPushTokenRequest, null>(UPDATE_USER_PUSH_TOKEN_CFN)

export async function updateUserPushToken(pushToken: string) {
  await fn({ pushToken })
}
