import "server-only"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { formatDateForAPI, parseDate, setEndOfDay, setStartOfDay } from "@/utils/dateUtils"

import { fetchFromTrafikverket } from "../fetchFromTrafikverket"
import { getAdvertisedTrainIdentQuery, getPendeltagQuery } from "./query"
import { cacheLife } from "next/cache"

export const getCommuterTrains = async (fromStation: string, toStation: string, selectedDay: string) => {
  "use cache"
  cacheLife("seconds")

  const dateFrom = formatDateForAPI(setStartOfDay(parseDate(selectedDay)))
  const dateTo = formatDateForAPI(setEndOfDay(parseDate(selectedDay ?? new Date())))

  const allPendeltag = await fetchFromTrafikverket(getAdvertisedTrainIdentQuery(toStation))
    .then((res) => res.json())
    .then((res) => res.RESPONSE.RESULT[0].TrainAnnouncement[0].AdvertisedTrainIdent)

  const response = await fetchFromTrafikverket(
    getPendeltagQuery({
      dateFrom,
      dateTo,
      fromStation,
      toStation,
      trains: allPendeltag,
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

  return { trains: data, date, error }
}
