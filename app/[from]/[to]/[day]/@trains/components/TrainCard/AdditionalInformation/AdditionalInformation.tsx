import dayjs from "dayjs"
import { usePathname } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"

import { IGroupedByStation } from "@/app/api/train/route"

import { Station } from "../TrainCard.Station"
import { groupedStations } from "./groupStation"

export interface IAdditionalInformation {
  operationalTrainNumber: string
  scheduledDepartureDateTime: string
  isCommuterTrain?: boolean
}

const fetcher = (url: URL, init?: RequestInit) =>
  fetch(url, init)
    .then((res) => res.json())
    .then((res) => ({ stations: res, date: new Date() }))

export const AdditionalInformation = (props: IAdditionalInformation) => {
  const { operationalTrainNumber, scheduledDepartureDateTime, isCommuterTrain } = props
  const [_, from, to] = usePathname().split("/")

  const searchParams = new URLSearchParams({ operationalTrainNumber, scheduledDepartureDateTime }).toString()
  const URL = "/api/train?" + searchParams
  const { data } = useSWR<{ stations: IGroupedByStation[]; date: Date }>(URL, fetcher, { suspense: true })
  const { stations, date } = data ?? {}

  const { previousStations, relevantStations, upcomingStations } = groupedStations({
    stations,
    from,
    to,
    isCommuterTrain,
  })

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">Tidtabell</div>
        <span className="text-sm text-right text-slate-500 dark:text-slate-400">
          Hämtad {dayjs(date).format("HH:mm:ss")}
        </span>
      </div>

      <div className="space-y-4">
        {stations?.length === 0 && <p className="text-xs text-slate-900 dark:text-slate-300">Hittar ingen tidtabell</p>}
        {previousStations?.length ? <PreviousStations stations={previousStations} /> : null}

        {relevantStations?.map((station, idx) => (
          <Station key={station.station} station={station} isLast={relevantStations.length === idx + 1} />
        ))}

        {upcomingStations.length ? <UpcomingStations stations={upcomingStations} /> : null}
      </div>
    </>
  )
}

const PreviousStations = ({ stations }: { stations: IGroupedByStation[] }) => {
  const [displayPreviousStations, set_displayPreviousStations] = useState(false)

  return (
    <>
      <button
        onClick={() => set_displayPreviousStations((prev) => !prev)}
        className="w-full text-sm text-slate-900/75 dark:text-slate-300/75"
      >
        {displayPreviousStations ? "Göm tidigare stationer" : "Visa tidigare stationer"}
      </button>

      {displayPreviousStations && (
        <>
          {stations.map((station, idx) => (
            <Station key={station.station} station={station} isLast={stations.length === idx + 1} />
          ))}

          <div className="border-b border-b-slate-600" />
        </>
      )}
    </>
  )
}

const UpcomingStations = ({ stations }: { stations: IGroupedByStation[] }) => {
  const [displayUpComingStations, ste_displayUpComingStations] = useState(false)

  return (
    <>
      {displayUpComingStations && (
        <>
          <div className="border-t border-t-slate-600" />

          {stations.map((station, idx) => (
            <Station key={station.station} station={station} isLast={stations.length === idx + 1} />
          ))}
        </>
      )}

      <button
        onClick={() => ste_displayUpComingStations((prev) => !prev)}
        className="w-full text-sm text-slate-900/75 dark:text-slate-300/75"
      >
        {displayUpComingStations ? "Göm efterliggande stationer" : "Visa efterliggande stationer"}
      </button>
    </>
  )
}
