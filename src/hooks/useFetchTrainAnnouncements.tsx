import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { useQuery } from "@tanstack/react-query"

export interface IRequiredValues {
  from: string
  to: string
  day: string
}

export interface IUseFetchTrainAnnouncements extends IRequiredValues {
  initialData: any
}

export const useFetchTrainAnnouncements = ({ from, to, day, initialData }: IUseFetchTrainAnnouncements) => {
  const { data, isLoading, error } = useQuery<TrainAnnouncement[]>({
    queryKey: [`TrainAnnouncements`, from, to, day],
    queryFn: () => fetchTrainAnnouncements({ from, to, day }),
    onError: console.error,
    // staleTime: 1 minute
    staleTime: 60000,
    initialData,
  })

  return { data, isLoading, error }
}

export const fetchTrainAnnouncements = async ({ from, to, day }: IRequiredValues) => {
  const response = await fetch(`/api/trains?from=${from}&to=${to}&day=${day}`)
  const json = await response.json()
  return json
}
