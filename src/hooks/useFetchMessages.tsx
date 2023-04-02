import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { TrainMessage } from "@/types/TrainMessage"
import { useQuery } from "@tanstack/react-query"

export interface IRequiredValues {
  station: string
}

export interface IUseFetchTrainAnnouncements extends IRequiredValues {
  initialData: any
}

export const useFetchMessages = ({ station, initialData }: IUseFetchTrainAnnouncements) => {
  const { data, isLoading, error } = useQuery<TrainMessage[]>({
    queryKey: [`TrainMessages`, station],
    queryFn: () => fetchMessages({ station }),
    onError: console.error,
    // staleTime: 1 minute
    staleTime: 60000,
    initialData,
  })

  return { data, isLoading, error }
}

export const fetchMessages = async ({ station }: IRequiredValues) => {
  const response = await fetch(`/api/message?station=${station}`)
  const json = await response.json()
  return json
}