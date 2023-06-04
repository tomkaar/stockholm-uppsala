import dayjs from "dayjs"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"

import { fetchFromTrafikverket } from "../fetchFromTrafikverket"
import { getAdvertisedTrainIdentQuery, getPendeltagQuery } from "./query"

export const getCommuterTrains = async (fromStation: string, toStation: string, selectedDay: string) => {
  const dateFrom = dayjs(selectedDay ?? new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .format("DD MMM YYYY HH:mm:ss")

  const dateTo = dayjs(selectedDay ?? new Date())
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .format("DD MMM YYYY HH:mm:ss")

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
