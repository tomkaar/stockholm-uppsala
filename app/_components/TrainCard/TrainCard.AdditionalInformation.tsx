import useSWR, { useSWRConfig } from 'swr'
import { IGroupedByStation } from "../../api/train/route"
import { Refresh } from "@/assets/icons/Refresh"
import { Station } from './TrainCard.Station'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export interface IAdditionalInformation {
  operationalTrainNumber: string,
  scheduledDepartureDateTime: string
}

// @ts-expect-error - don't care about types for fetcher
const fetcher = (url, options, ...args) => fetch(url, { ...(options ?? {}), next: { revalidate: 30 }}, ...args).then(res => res.json())

export const AdditionalInformation = ({ operationalTrainNumber, scheduledDepartureDateTime }: IAdditionalInformation) => {
  const [_, from, to] = usePathname().split("/")

  const { mutate } = useSWRConfig()
  const URL = `/api/train?operationalTrainNumber=${operationalTrainNumber}&scheduledDepartureDateTime=${scheduledDepartureDateTime}`
  const { data: stations, error, isLoading } = useSWR<IGroupedByStation[]>(URL, fetcher)

  const [displayPreviousStations, set_displayPreviousStations] = useState(false)
  const [displayUpComingStations, ste_displayUpComingStations] = useState(false)

  const groupedStations = stations?.reduce<{ relevantStations: IGroupedByStation[], previousStations: IGroupedByStation[], upcomingStations: IGroupedByStation[] }>((acc, cur, idx, arr) => {
    const isBeforeFromStation = idx < arr.findIndex(item => item.station === from)
    const isAfterToStation = idx > arr.findIndex(item => item.station === to)

    if (isBeforeFromStation) acc.previousStations.push(cur)
    else if (isAfterToStation) acc.upcomingStations.push(cur)
    else acc.relevantStations.push(cur)

    return acc
  }, {
    relevantStations: [],
    previousStations: [],
    upcomingStations: [],
  })

  if (error) {
    return (
      <div className="border-t border-t-slate-700 pt-4 mt-4 flex flex-row gap-2 justify-between items-center">
        <div className="space-y-1">
          <h4 className="text-md font-medium leading-4 text-slate-900 dark:text-slate-300">
            Någonting gick fel
          </h4>
          <p className="text-xs text-slate-900 dark:text-slate-300">
            Kunde inte ladda tidtabellen, försök igen senare
          </p>
        </div>
        <button onClick={() => mutate(URL)} className="flex flex-row justify-center items-center rounded-full p-1 w-8 h-8 bg-slate-300 dark:db-slate-800">
          <Refresh width={16} height={16} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col relative space-y-4 border-t border-t-slate-900/10 dark:border-t-slate-700 pt-4 ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">Tidtabell</div>

        <button
          onClick={() => mutate(URL)}
          className="flex flex-row justify-center items-center rounded-full py-1 px-3 h-8 bg-slate-300 dark:db-slate-800"
          disabled={isLoading}
        >
          <span className="block mr-2 text-xs">Hämta igen</span>
          <Refresh width={12} height={12} />
        </button>
      </div>

      <div className="space-y-4">
        {stations?.length === 0 && (
          <p className="text-xs text-slate-900 dark:text-slate-300">
            Hittar ingen tidtabell
          </p>
        )}
        {!!groupedStations?.previousStations?.length && (
          <>
            <button
              onClick={() => set_displayPreviousStations(prev => !prev)}
              className='w-full text-sm text-slate-900/75 dark:text-slate-300/75'
            >
              {displayPreviousStations ? "Göm tidigare stationer" : "Visa tidigare stationer"}
            </button>

            {displayPreviousStations && (
              <>
                {groupedStations.previousStations.map((station, idx) => (
                  <Station key={station.station} station={station} isLast={groupedStations.previousStations.length === idx + 1} />
                ))}

                <div className='border-b border-b-slate-600' />
              </>
            )}
          </>
        )}

        {groupedStations?.relevantStations?.map((station, idx) => (
          <Station key={station.station} station={station} isLast={groupedStations?.relevantStations.length === idx + 1} />
        ))}

        {isLoading && ["one", "two", "three", "four"]?.map((station, idx) => (
          <Station key={station} isLoading isLast={4 === idx + 1} />
        ))}

        {!!groupedStations?.upcomingStations?.length && (
          <>
            {displayUpComingStations && (
              <>
                <div className='border-t border-t-slate-600' />

                {groupedStations.upcomingStations.map((station, idx) => (
                  <Station key={station.station} station={station} isLast={groupedStations.upcomingStations.length === idx + 1} />
                ))}
              </>
            )}

            <button 
              onClick={() => ste_displayUpComingStations(prev => !prev)}
              className='w-full text-sm text-slate-900/75 dark:text-slate-300/75'
            >
              {displayUpComingStations ? "Göm efterliggande stationer" : "Visa efterliggande stationer"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}