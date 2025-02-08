import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Group, GroupInvitation } from './groupTypes'
import { queryKeystore } from '../queryKeystore'
import { queryClient } from '@/providers/QueryProvider'

export function useGetGroupInvitation(id: string) {
  return useQuery({
    queryKey: queryKeystore.groupInvitation(id),
    queryFn: () => {
      const groupInvitations = queryClient.getQueryData<GroupInvitation[]>(queryKeystore.groupInvitations)
      return groupInvitations?.find(groupInvitation => groupInvitation.id === id) ?? null
    },
  })
}
