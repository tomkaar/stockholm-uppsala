import useSWR, { useSWRConfig } from 'swr'
import { IGroupedByStation } from "../../api/train/route"
import { Refresh } from "@/assets/icons/Refresh"
import { Station } from './TrainCard.Station'

export interface IAdditionalInformation {
  operationalTrainNumber: string,
  scheduledDepartureDateTime: string
}

// @ts-expect-error - don't care about types for fetcher
const fetcher = (url, options, ...args) => fetch(url, { ...(options ?? {}), next: { revalidate: 30 }}, ...args).then(res => res.json())

export const AdditionalInformation = ({ operationalTrainNumber, scheduledDepartureDateTime }: IAdditionalInformation) => {
  const { mutate } = useSWRConfig()
  const URL = `/api/train?operationalTrainNumber=${operationalTrainNumber}&scheduledDepartureDateTime=${scheduledDepartureDateTime}`
  const { data: stations, error, isLoading } = useSWR<IGroupedByStation[]>(URL, fetcher)

  if (isLoading) {
    return (
      <div className="mt-4 animate-pulse flex flex-col gap-2">
        <div className="w-4/12 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="w-11/12 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="w-9/12 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
    )
  }

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

        <button onClick={() => mutate(URL)} className="flex flex-row justify-center items-center rounded-full py-1 px-3 h-8 bg-slate-300 dark:db-slate-800">
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
        {stations?.map((station, idx) => (
          <Station key={station.station} station={station} isLast={stations.length === idx + 1} />
        ))}
      </div>
    </div>
  )
}
