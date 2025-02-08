import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Group } from './groupTypes'
import { queryKeystore } from '../queryKeystore'
import { queryClient } from '@/providers/QueryProvider'

export function useGetGroup(id: string) {
  return useQuery({
    queryKey: queryKeystore.group(id),
    queryFn: () => {
      const groups = queryClient.getQueryData<Group[]>(queryKeystore.groups)
      return groups?.find(group => group.id === id)
    },
  })
}
