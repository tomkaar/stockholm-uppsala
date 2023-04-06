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
        <span className="rounded-md px-1 py-0.5 text-white bg-rose-500 dark:bg-rose-500 mr-2 font-bold">
          Inställt
        </span>

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
        {hasDepartured && displayLeftStation && <span className="mr-1">Lämnat stationen:</span>}

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
      {hasDepartured && displayLeftStation && <span className="mr-1">Lämnade stationen:</span>}

      <time
        dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      >
        {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      </time>
    </span>
  );
};
