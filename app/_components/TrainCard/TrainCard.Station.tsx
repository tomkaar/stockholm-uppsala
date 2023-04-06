import { IGroupedByStation } from "../../api/train/route"
import { StationTime } from "./TrainCard.Station.Time"

export const Station = ({ station, isLast }: { station: IGroupedByStation, isLast?: boolean }) => {
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
              {station.ankomst && <StationTime announcement={station.ankomst} />}
              {station.ankomst && station.avgang && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  &nbsp;-&nbsp;
                </span>
              )}
              {station.avgang && <StationTime announcement={station.avgang} />}
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
