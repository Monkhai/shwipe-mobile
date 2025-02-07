import ProtectedRoute from '@/shared/ProtectedRoute'
import InviteToGroupView from '@/views/invite-to-group/InviteToGroupView'

export default function InviteToGroup() {
  return (
    <ProtectedRoute>
      <InviteToGroupView />
    </ProtectedRoute>
  )
}
