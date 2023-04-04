"use client";

import { codeCancelled } from "@/constants/codes";
import { TrainAnnouncement } from "@/types/TrainAnnouncement";
import dayjs from "dayjs";
import { useState } from "react";

export type TTrainCard = {
  announcement: TrainAnnouncement;
  isDisabled?: boolean;
};

export const TrainCard = ({ announcement, isDisabled }: TTrainCard) => {
  const [displayAdditionalInformation, set_displayAdditionalInformation] =
    useState(false);

  const isMalartag = announcement?.ProductInformation?.find(
    (info) => info.Code === "PNA014"
  );
  const isSJRegional = announcement?.ProductInformation?.find(
    (info) => info.Code === "PNA025"
  );

  const isCanceled = announcement.Canceled || announcement.Deviation?.some(deviation => deviation.Code === codeCancelled)
  const hasDepartured = announcement.TimeAtLocation;
  const hasDeviations = announcement.Deviation?.length;

  return (
    <div
      className={`bg-slate-50 dark:bg-slate-800 ${
        isCanceled || hasDepartured || isDisabled ? "opacity-50" : ""
      } rounded-lg`}
    >
      <button
        className="text-left w-full p-2 flex flex-row justify-between"
        onClick={() => set_displayAdditionalInformation((prev) => !prev)}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-slate-200/50 dark:bg-slate-700/50 w-10 h-10 mr-1 relative">
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              {isMalartag ? "🚈" : isSJRegional ? "🚂" : "🚂"}
            </span>
          </div>

          <div className="flex flex-col">
            <strong className="text-base text-slate-900 font-semibold dark:text-slate-300">
              {announcement.ProductInformation?.map((p) => p.Description).join(
                " "
              ) ?? ""}
              <span className="text-slate-700 dark:text-slate-400 font-normal">
                {" "}
                {announcement.AdvertisedTrainIdent}
              </span>
            </strong>

            <Time announcement={announcement} />

            {hasDeviations && (
              <ul className="text-sm text-orage-600 dark:text-orange-500">
                {announcement.Deviation?.map((deviation) => (
                  <li key={deviation.Code}>{deviation.Description}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Spår: {announcement.TrackAtLocation}
        </span>
      </button>

      {displayAdditionalInformation && (
        <div className="p-4 border-t border-slate-900/10 dark:border-slate-700">
          {((announcement.OtherInformation?.length ?? 0) === 0 && (announcement.Booking?.length ?? 0 === 0)) ? (
            <p className="text-sm text-slate-900 dark:text-slate-300">Ingen ytterligare information</p>
          ) : (
            <ul className="text-sm text-slate-900 dark:text-slate-300">
              {announcement.OtherInformation?.map((information) => (
                <li key={information.Description}>{information.Description}</li>
              ))}
              {announcement.Booking?.map((booking) => (
                <li key={booking.Description}>{booking.Description}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

type TTime = {
  announcement: TrainAnnouncement;
};

const Time = ({ announcement }: TTime) => {
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
        {hasDepartured && <span className="mr-1">Lämnat stationen:</span>}

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
      {hasDepartured && <span className="mr-1">Lämnade stationen:</span>}

      <time
        dateTime={dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      >
        {dayjs(announcement.AdvertisedTimeAtLocation).format("HH:mm")}
      </time>
    </span>
  );
};
