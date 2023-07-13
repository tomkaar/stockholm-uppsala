import dayjs from "dayjs"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"

type TTime = {
  announcement: TrainAnnouncement
  displayCancelled?: boolean
}

export const Time = ({ announcement, displayCancelled = true }: TTime) => {
  const isDelayed = !!announcement.EstimatedTimeAtLocation
  const isCanceled = announcement.Canceled

  if (isCanceled && displayCancelled) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        <span className="rounded-md px-1 py-0.5 text-white bg-rose-500 dark:bg-rose-500 mr-2 font-bold">Inställt</span>

        <time className="line-through" dateTime={formatHHmm(announcement.AdvertisedTimeAtLocation)}>
          {formatHHmm(announcement.AdvertisedTimeAtLocation)}
        </time>
      </span>
    )
  }

  if (isDelayed) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        <time
          className="rounded-md px-1 py-0.5 text-white bg-rose-500 dark:bg-rose-500 mr-2 font-bold"
          dateTime={formatHHmm(announcement.EstimatedTimeAtLocation)}
        >
          {formatHHmm(announcement.EstimatedTimeAtLocation)}
        </time>

        <time className="line-through" dateTime={formatHHmm(announcement.AdvertisedTimeAtLocation)}>
          {formatHHmm(announcement.AdvertisedTimeAtLocation)}
        </time>
      </span>
    )
  }

  return (
    <span className="text-sm text-slate-500 dark:text-slate-400">
      <time dateTime={formatHHmm(announcement.AdvertisedTimeAtLocation)}>
        {formatHHmm(announcement.AdvertisedTimeAtLocation)}
      </time>
    </span>
  )
}

function formatHHmm(date: string | Date = new Date()) {
  return dayjs(date).format("HH:mm")
}
