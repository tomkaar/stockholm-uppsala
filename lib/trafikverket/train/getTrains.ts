import "server-only"

import { stationStockholm, stationUppsala } from "@/constants/stations"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { formatDateForAPI, parseDate, setEndOfDay, setStartOfDay } from "@/utils/dateUtils"

import { fetchFromTrafikverket } from "../fetchFromTrafikverket"
import { getTrainsQuery } from "./query"
import { cacheLife } from "next/cache"

export const getTrains = async (
  fromStation: string = stationStockholm,
  toStation: string = stationUppsala,
  selectedDay: string
) => {
  "use cache"
  cacheLife("seconds")

  const dateFrom = formatDateForAPI(setStartOfDay(parseDate(selectedDay)))
  const dateTo = formatDateForAPI(setEndOfDay(parseDate(selectedDay ?? new Date())))

  const response = await fetchFromTrafikverket(getTrainsQuery({ dateFrom, dateTo, fromStation, toStation }))
    .then(async (res) => await res.json())
    .then((data) => data.RESPONSE.RESULT[0].TrainAnnouncement ?? [])
    .then((data) => ({ data, date: new Date(), error: false }))
    .catch((error) => ({ data: [], date: new Date(), error: true }))

  const { data, date, error } = response as {
    data: TrainAnnouncement[]
    date: Date
    error: boolean
  }

  return { trains: data, date, error }
}
