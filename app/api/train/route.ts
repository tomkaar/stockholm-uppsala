import { NextResponse } from "next/server"

import { TrainAnnouncementResponse } from "@/types/Response"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"

import { stations } from "../../data/stations"

export const GET = async (request: Request) => {
  const url = new URL(request.url)
  const SearchParams = new URLSearchParams(url.searchParams)

  const operationalTrainNumber = SearchParams.get("operationalTrainNumber")

  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    next: {
      revalidate: 10,
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
          <QUERY objecttype='TrainAnnouncement' orderby='AdvertisedTimeAtLocation' schemaversion='1.8'>
            <FILTER>
              <AND>
                <EQ name="Advertised" value="true" />
                <EQ name="OperationalTrainNumber" value="${operationalTrainNumber}" />
              </AND>
            </FILTER>

            <INCLUDE>ActivityId</INCLUDE>
            <INCLUDE>ActivityType</INCLUDE>
            <INCLUDE>LocationSignature</INCLUDE>
            <INCLUDE>ScheduledDepartureDateTime</INCLUDE>
            <INCLUDE>TimeAtLocation</INCLUDE>
            <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
            <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
            <INCLUDE>AdvertisedTrainIdent</INCLUDE>
            <INCLUDE>OperationalTrainNumber</INCLUDE>
            <INCLUDE>Canceled</INCLUDE>
            <INCLUDE>EstimatedTimeIsPreliminary</INCLUDE>
            <INCLUDE>TrackAtLocation</INCLUDE>
        </QUERY>
      </REQUEST>
    `,
  })

  if (!response.ok) {
    console.error(response)
    throw new Error("Kunde inte hämta information")
  }

  const result: TrainAnnouncementResponse = await response.json()

  const trainAnnouncement = result.RESPONSE.RESULT[0].TrainAnnouncement ?? []

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
