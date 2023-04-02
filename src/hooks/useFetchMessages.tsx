import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { TrainMessage } from "@/types/TrainMessage"
import { useQuery } from "@tanstack/react-query"

export interface IUseFetchTrainAnnouncements {
  station: string
}

export const useFetchMessages = ({ station }: IUseFetchTrainAnnouncements) => {
  const { data, isLoading, error } = useQuery<TrainMessage[]>({
    queryKey: [`TrainMessages`, station],
    queryFn: async () => {
      const response = await fetch(`/api/message?station=${station}`)
      const json = await response.json()
      return json
    },
    onError: console.error,
    // staleTime: 1 minute
    staleTime: 60000,
  })

  return { data, isLoading, error }
}
