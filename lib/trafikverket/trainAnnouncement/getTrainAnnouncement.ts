import "server-only"

import { fetchFromTrafikverket } from "../fetchFromTrafikverket"
import { getTrainAnnouncementQuery } from "./query"
import { cacheLife } from "next/cache"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"

export const getTrainAnnouncement = async (
  operationalTrainNumber: string | null,
  scheduledDepartureDateTime: string | null
) => {
  "use cache"
  cacheLife("seconds")

  if (operationalTrainNumber === null || scheduledDepartureDateTime === null) {
    return { trains: [], date: new Date(), error: true }
  }

  const response = await fetchFromTrafikverket(
    getTrainAnnouncementQuery({
      operationalTrainNumber,
      scheduledDepartureDateTime,
    })
  )
    .then((res) => res.json())
    .then((res) => res.RESPONSE.RESULT[0].TrainAnnouncement ?? [])
    .then((data) => ({ data, date: new Date(), error: false }))
    .catch(() => ({ data: [], date: new Date(), error: true }))

  const { data, date, error } = response as {
    data: TrainAnnouncement[]
    date: Date
    error: boolean
  }

  return { data, date, error }
}
