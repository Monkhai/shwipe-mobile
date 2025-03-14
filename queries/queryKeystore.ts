export const queryKeystore = {
  publicId: ['publicId'],
  sessions: ['sessions'],
  users: ['users'],
  user: (id: string) => ['users', id],
  friends: ['friends'],
  sentFriendRequests: ['sentFriendRequests'],
  receivedFriendRequests: ['receivedFriendRequests'],
  groups: ['groups'],
  group: (id: string) => ['groups', id],
  groupInvitations: ['groupInvitations'],
  groupInvitation: (id: string) => ['groupInvitations', id],
  onboardingData: ['onboardingData'],
  popularRestaurants: ['popularRestaurants'],
  restaurantDetails: (placeId: string) => ['restaurantDetails', placeId],
}
