import dayjs from "dayjs"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"

export const StationTime = ({ announcement }: { announcement: TrainAnnouncement }) => {
  const isDelayed = !!announcement.EstimatedTimeAtLocation
  const isCanceled = announcement.Canceled

  if (isCanceled) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        <time className="line-through" dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}>
          {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
        </time>
      </span>
    )
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

        <time className="line-through" dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}>
          {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
        </time>

        {announcement.EstimatedTimeIsPreliminary && <span className="ml-1">Preliminär</span>}
      </span>
    )
  }

  return (
    <span className="text-sm text-slate-500 dark:text-slate-400">
      <time dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}>
        {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      </time>
    </span>
  )
}
