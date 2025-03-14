export const GET_ALL_USERS_CFN = 'getAllUsers'
export const UPDATE_USER_PUSH_TOKEN_CFN = 'updateUserPushToken'
export const GET_PUBLIC_ID_CFN = 'getPublicId'
export const DELETE_ACCOUNT_CFN = 'deleteAccount'
export const GET_USER_CFN = 'getUser'

export type User = {
  id: string
  display_name: string
  photo_url: string
}
