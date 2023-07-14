import { IGroupedByStation } from "@/app/api/train/route"
import { Arrow } from "@/assets/icons/Arrow"

import { StationTime } from "./TrainCard.Station.Time"

export interface IStation {
  station?: IGroupedByStation
  isLast?: boolean
}

export const Station = ({ station, isLast }: IStation) => {
  const isCanceled = station?.ankomst?.Canceled || station?.avgang?.Canceled
  const hasDepartured = station?.avgang ? station?.avgang?.TimeAtLocation : station?.ankomst?.TimeAtLocation

  return (
    <div className="relative flex flex-row gap-4">
      <div className="mt-[6px] w-2 h-2 rounded-full shrink-0 bg-slate-700" />

      {!isLast && <div className="absolute top-6 left-[3px] w-[1px] h-[75%] bg-slate-700" />}

      <div className={`w-full ${hasDepartured ? "opacity-50" : ""}`}>
        <div className="flex flex-row justify-between">
          <div>
            <h4 className="text-md font-medium leading-4 text-slate-900 dark:text-slate-50">{station?.namn ?? ""}</h4>

            <p className={`mt-1 flex items-end gap-2`}>
              {station?.ankomst && (
                <div className="flex flex-col justify-end">
                  {station.ankomst?.EstimatedTimeIsPreliminary && (
                    <div className="mb-0.5 text-xs text-slate-500 dark:text-slate-400">Preliminär tid</div>
                  )}
                  <StationTime announcement={station.ankomst} />
                </div>
              )}
              {station?.ankomst && station?.avgang && (
                <Arrow width={16} height={16} className="rotate-90 text-slate-500 dark:text-slate-400 mb-0.5" />
              )}
              {station?.avgang && (
                <div className="flex flex-col justify-end">
                  {station.avgang?.EstimatedTimeIsPreliminary && (
                    <div className="mb-0.5 text-xs text-slate-500 dark:text-slate-400">Preliminär tid</div>
                  )}
                  <StationTime announcement={station.avgang} />
                </div>
              )}
            </p>
          </div>

          <div>
            {isCanceled || hasDepartured ? (
              <div className="mb-1">
                {isCanceled && <div className="text-rose-500">Inställt</div>}
                {hasDepartured && (
                  <div className="text-xs bg-green-600 py-0.5 px-2 rounded-lg text-white">Lämnat stationen</div>
                )}
              </div>
            ) : null}

            {(station?.ankomst?.TrackAtLocation || station?.avgang?.TrackAtLocation) && (
              <div className="text-sm text-right text-slate-500 dark:text-slate-400">
                Spår: {station?.ankomst?.TrackAtLocation || station?.avgang?.TrackAtLocation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
