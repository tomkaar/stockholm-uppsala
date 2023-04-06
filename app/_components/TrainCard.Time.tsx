import { TrainAnnouncement } from "@/types/TrainAnnouncement";
import dayjs from "dayjs";

type TTime = {
  announcement: TrainAnnouncement;
  displayLeftStation?: boolean
};

export const Time = ({ announcement, displayLeftStation = true }: TTime) => {
  const isDelayed = !!announcement.EstimatedTimeAtLocation;
  const isCanceled = announcement.Canceled;
  const hasDepartured = announcement.TimeAtLocation;

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

        <span className="text-rose-500 dark:text-rose-800 ml-2 font-bold">
          Inställt
        </span>
      </span>
    );
  }

  if (isDelayed) {
    return (
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {hasDepartured && displayLeftStation && <span className="mr-1">Lämnat stationen:</span>}

        <time
          className="line-through"
          dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format(
            "HH:mm"
          )}
        >
          {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
        </time>

        <time
          className="text-rose-500 dark:text-rose-800 ml-2 font-bold"
          dateTime={dayjs(announcement.EstimatedTimeAtLocation).format("HH:mm")}
        >
          {dayjs(announcement.EstimatedTimeAtLocation).format("HH:mm")}
        </time>

        {announcement.EstimatedTimeIsPreliminary && (
          <span className="ml-1">Preliminär</span>
        )}
      </span>
    );
  }

  return (
    <span className="text-sm text-slate-500 dark:text-slate-400">
      {hasDepartured && displayLeftStation && <span className="mr-1">Lämnade stationen:</span>}

      <time
        dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      >
        {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      </time>
    </span>
  );
};
