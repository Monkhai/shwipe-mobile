import { useQueryClient } from '@tanstack/react-query'
import { Group } from './groupTypes'
import { queryKeystore } from '../queryKeystore'

export function useGetGroup(id: string) {
  const queryClient = useQueryClient()
  const groups = queryClient.getQueryData<Group[]>(queryKeystore.groups)

  const group = groups?.find(group => group.id === id)

  return group
}
