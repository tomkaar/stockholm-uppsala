import { NextResponse } from "next/server"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"

import { stations } from "../../data/stations"
import { getTrainAnnouncement } from "@/lib/trafikverket/trainAnnouncement/getTrainAnnouncement"

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const SearchParams = new URLSearchParams(url.searchParams)

  const operationalTrainNumber = SearchParams.get("operationalTrainNumber")
  const scheduledDepartureDateTime = SearchParams.get("scheduledDepartureDateTime")

  const response = await getTrainAnnouncement(operationalTrainNumber, scheduledDepartureDateTime)
  const trainAnnouncement = response.data

  if (!trainAnnouncement || trainAnnouncement.length === 0) {
    return NextResponse.json([])
  }

  const groupedByStation = trainAnnouncement.reduce<IGroupedByStationObject>((acc, cur) => {
    const station = cur.LocationSignature ?? ""
    const name =
      stations.find((station) => station.LocationSignature === cur.LocationSignature)?.AdvertisedLocationName ??
      cur.LocationSignature ??
      ""
    const ankomst = cur.ActivityType === "Ankomst"

    acc[station] = { ...acc[station] }
    acc[station]["station"] = station
    acc[station]["namn"] = name

    if (ankomst) acc[station]["ankomst"] = cur
    else acc[station]["avgang"] = cur

    return acc
  }, {})

  const groupedStationArray = Object.values(groupedByStation)

  return NextResponse.json(groupedStationArray)
}

export interface IGroupedByStation {
  station: string
  namn: string
  ankomst: TrainAnnouncement
  avgang: TrainAnnouncement
}

export interface IGroupedByStationObject {
  [station: string]: IGroupedByStation
}
