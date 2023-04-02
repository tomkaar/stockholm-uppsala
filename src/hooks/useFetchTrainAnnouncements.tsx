import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { useQuery } from "@tanstack/react-query"

export interface IUseFetchTrainAnnouncements {
  from: string
  to: string
  day: string
}

export const useFetchTrainAnnouncements = ({ from, to, day }: IUseFetchTrainAnnouncements) => {
  const { data, isLoading, error } = useQuery<TrainAnnouncement[]>({
    queryKey: [`TrainAnnouncements`, from, to, day],
    queryFn: async () => {
      const response = await fetch(`/api/trains?from=${from}&to=${to}&day=${day}`)
      const json = await response.json()
      return json
    },
    onError: console.error,
    // staleTime: 1 minute
    staleTime: 60000,
  })

  return { data, isLoading, error }
}
