import useSWR, { useSWRConfig } from 'swr'
import { IGroupedByStation } from "../api/train/route"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import dayjs from "dayjs"
import { Refresh } from "@/assets/icons/Refresh"

export interface IAdditionalInformation {
  operationalTrainNumber: string,
  scheduledDepartureDateTime: string
}

// @ts-expect-error - don't care about types for fetcher
const fetcher = (url, options, ...args) => fetch(url, { ...(options ?? {}), next: { revalidate: 30 }}, ...args).then(res => res.json())

export const AdditionalInformation = ({ operationalTrainNumber, scheduledDepartureDateTime }: IAdditionalInformation) => {
  const { mutate } = useSWRConfig()
  const URL = `/api/train?operationalTrainNumber=${operationalTrainNumber}&scheduledDepartureDateTime=${scheduledDepartureDateTime}`
  const { data, error, isLoading } = useSWR<IGroupedByStation[]>(URL, fetcher)

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
        {data?.map((station, idx) => (
          <Station key={station.station} station={station} isLast={data.length === idx + 1} />
        ))}
      </div>
    </div>
  )
}

const Station = ({ station, isLast }: { station: IGroupedByStation, isLast?: boolean }) => {
  const isDelayed = !!station?.ankomst?.EstimatedTimeAtLocation || !!station?.avgang?.EstimatedTimeAtLocation
  const isCanceled = station?.ankomst?.Canceled || station?.avgang?.Canceled
  const hasDepartured = station?.ankomst?.TimeAtLocation || station?.avgang?.TimeAtLocation
  
  return (
    <div className="relative flex flex-row gap-4">
      <div className="mt-[6px] w-2 h-2 rounded-full bg-slate-700" />
      {!isLast && (
        <div className="absolute top-6 left-[3px] w-[1px] h-[75%] bg-slate-700" />
      )}

      <div className={`w-full ${hasDepartured ? 'opacity-50' : ''}`}>
        <div className="flex flex-row justify-between">
          <div>
            <h4 className="text-md font-medium leading-4 text-slate-900 dark:text-slate-50">{station.namn}</h4>

            <p className={`mt-1`}>
              {station.ankomst && <Time announcement={station.ankomst} />}
              {station.ankomst && station.avgang && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  &nbsp;-&nbsp;
                </span>
              )}
              {station.avgang && <Time announcement={station.avgang} />}
            </p>
          </div>

          <div>
            {hasDepartured && <div className="text-sm text-right text-slate-500 dark:text-slate-400">Har lämnat stationen</div>}
            {isCanceled && <div className={`${isDelayed || isCanceled ? ' text-right text-rose-500 dark:text-rose-500' : ''}`}>Installt</div>}
            {isDelayed && <div className={`${isDelayed || isCanceled ? ' text-right text-rose-500 dark:text-rose-500' : ''}`}>Försenad</div>}
          </div>
        </div>

        
      </div>
    </div>
  )
}

const Time = ({ announcement }: { announcement: TrainAnnouncement }) => {
  const isDelayed = !!announcement.EstimatedTimeAtLocation
  const isCanceled = announcement.Canceled

  if (isCanceled) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        <time
          className="line-through"
          dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format(
            "HH:mm"
          )}
        >
          {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
        </time>
      </span>
    );
  }

  if (isDelayed) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        <time
          className="rounded-md px-1 py-0.5 text-white bg-rose-500 dark:bg-rose-500 mr-2 font-bold"
          dateTime={dayjs(announcement.EstimatedTimeAtLocation).format("HH:mm")}
        >
          {dayjs(announcement.EstimatedTimeAtLocation).format("HH:mm")}
        </time>

        <time
          className="line-through"
          dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format(
            "HH:mm"
          )}
        >
          {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
        </time>

        {announcement.EstimatedTimeIsPreliminary && (
          <span className="ml-1">Preliminär</span>
        )}
      </span>
    );
  }

  return (
    <span className="text-sm text-slate-500 dark:text-slate-400">
      <time
        dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      >
        {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      </time>
    </span>
  )
}
