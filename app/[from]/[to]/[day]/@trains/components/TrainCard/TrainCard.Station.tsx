import { IGroupedByStation } from "@/app/api/train/route"

import { StationTime } from "./TrainCard.Station.Time"

export interface IStation {
  station?: IGroupedByStation
  isLast?: boolean
  isLoading?: boolean
}

export const Station = ({ station, isLast, isLoading }: IStation) => {
  const isDelayed = !!station?.ankomst?.EstimatedTimeAtLocation || !!station?.avgang?.EstimatedTimeAtLocation
  const isCanceled = station?.ankomst?.Canceled || station?.avgang?.Canceled
  const hasDepartured = station?.ankomst?.TimeAtLocation || station?.avgang?.TimeAtLocation

  return (
    <div className={`relative flex flex-row gap-4 ${isLoading ? "animate-pulse" : ""}`}>
      <div
        className={`mt-[6px] w-2 h-2 rounded-full ${isLoading ? "bg-slate-200 dark:bg-slate-700" : "bg-slate-700"}`}
      />
      {!isLast && (
        <div
          className={`absolute top-6 left-[3px] w-[1px] h-[75%] ${
            isLoading ? "bg-slate-200 dark:bg-slate-700" : "bg-slate-700"
          }`}
        />
      )}

      <div className={`w-full ${hasDepartured ? "opacity-50" : ""}`}>
        <div className="flex flex-row justify-between">
          <div>
            {isLoading ? (
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            ) : (
              <h4 className="text-md font-medium leading-4 text-slate-900 dark:text-slate-50">{station?.namn ?? ""}</h4>
            )}

            <p className={`mt-1`}>
              {isLoading && (
                <span className="block pt-1 pb-1">
                  <span className="block pt-1 pb-1 w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                </span>
              )}

              {station?.ankomst && <StationTime announcement={station?.ankomst} />}
              {station?.ankomst && station?.avgang && (
                <span className="text-sm text-slate-500 dark:text-slate-400">&nbsp;-&nbsp;</span>
              )}
              {station?.avgang && <StationTime announcement={station?.avgang} />}
            </p>
          </div>

          <div>
            {hasDepartured && (
              <div className="text-sm text-right text-slate-500 dark:text-slate-400">Har lämnat stationen</div>
            )}
            {isCanceled && (
              <div className={`${isDelayed || isCanceled ? " text-right text-rose-500 dark:text-rose-500" : ""}`}>
                Installt
              </div>
            )}
            {isDelayed && (
              <div className={`${isDelayed || isCanceled ? " text-right text-rose-500 dark:text-rose-500" : ""}`}>
                Försenad
              </div>
            )}
            {(station?.ankomst?.TrackAtLocation || station?.avgang?.TrackAtLocation) && (
              <div className="text-sm text-right text-slate-500 dark:text-slate-400">
                Spår: {station?.ankomst?.TrackAtLocation || station?.avgang?.TrackAtLocation}
              </div>
            )}
            {isLoading && <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />}
          </div>
        </div>
      </div>
    </div>
  )
}
