export const queryKeystore = {
  sessions: ['sessions'],
  users: ['users'],
  friends: ['friends'],
  sentFriendRequests: ['sentFriendRequests'],
  receivedFriendRequests: ['receivedFriendRequests'],
  groups: ['groups'],
  group: (id: string) => ['groups', id],
  groupInvitations: ['groupInvitations'],
}
