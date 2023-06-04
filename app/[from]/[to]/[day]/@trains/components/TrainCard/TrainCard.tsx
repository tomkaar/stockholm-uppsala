"use client";

import { Malartag, SJRegional, codeCancelled } from "@/constants/codes";
import { TrainAnnouncement } from "@/types/TrainAnnouncement";
import { useState } from "react";
import { AdditionalInformation } from "./TrainCard.AdditionalInformation";
import { Time } from "./TrainCard.Time";

export type TTrainCard = {
  departure: TrainAnnouncement;
  arrival?: TrainAnnouncement;
  isDisabled?: boolean;
};

export const TrainCard = ({ arrival, departure, isDisabled }: TTrainCard) => {
  const [displayAdditionalInformation, set_displayAdditionalInformation] = useState(false);

  const isPendelTag = !!departure?.TypeOfTraffic?.find(traffic => traffic.Description === "Pendeltåg") 
  const isMalartag = departure?.ProductInformation?.find(info => info.Code === Malartag);
  const isSJRegional = departure?.ProductInformation?.find(info => info.Code === SJRegional);

  const isCanceled = departure.Canceled || departure.Deviation?.some(deviation => deviation.Code === codeCancelled)
  const hasDepartured = departure.TimeAtLocation;
  const hasDeviations = !!departure.Deviation?.length;

  return (
    <div className={`bg-slate-50 dark:bg-slate-800 ${isCanceled || hasDepartured || isDisabled ? "opacity-50" : ""} rounded-lg`}>
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
              {departure.ProductInformation?.map((p) => p.Description).join(
                " "
              ) ?? ""}
              <span className="text-slate-700 dark:text-slate-400 font-normal">
                {" "}
                {departure.AdvertisedTrainIdent}
              </span>
            </strong>

            <div>
              <Time announcement={departure} />
              {arrival && (
                <>
                <span className="text-sm text-slate-500 dark:text-slate-400">{" - "}</span>
                <Time announcement={arrival} displayCancelled={false} displayLeftStation={false} />
                </>
              )}
            </div>

            {hasDeviations && (
              <ul className="text-sm text-orage-600 dark:text-orange-500">
                {departure.Deviation?.map((deviation) => (
                  <li key={deviation.Code}>{deviation.Description}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Spår: {departure.TrackAtLocation}
        </span>
      </button>

      {displayAdditionalInformation && (
        <div className="space-y-4 p-4 border-t border-slate-900/10 dark:border-slate-700">
          {((departure.OtherInformation?.length ?? 0) === 0 && (departure.Booking?.length ?? 0 === 0)) ? (
            <p className="text-sm text-slate-900 dark:text-slate-300">Ingen ytterligare information</p>
          ) : (
            <ul className="text-sm text-slate-900 dark:text-slate-300">
              {departure.OtherInformation?.map((information) => (
                <li key={information.Description}>{information.Description}</li>
              ))}
              {departure.Booking?.map((booking) => (
                <li key={booking.Description}>{booking.Description}</li>
              ))}
            </ul>
          )}

          <AdditionalInformation
            operationalTrainNumber={departure.OperationalTrainNumber ?? ""}
            scheduledDepartureDateTime={departure.ScheduledDepartureDateTime ?? ""}
            isCommuterTrain={isPendelTag}
          />
        </div>
      )}
    </div>
  );
};
