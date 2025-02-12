import ProtectedRoute from '@/shared/ProtectedRoute'
import RestaurantDetailsView from '@/views/restaurant/RestaurantDetailsView'

export default function RestaurantDetails() {
  return (
    <ProtectedRoute>
      <RestaurantDetailsView />
    </ProtectedRoute>
  )
}
