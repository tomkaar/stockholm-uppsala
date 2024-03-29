"use client"

import dayjs from "dayjs"
import { useState } from "react"

import { Chevron } from "@/assets/icons/Chevron"
import { TrainMessage } from "@/types/TrainMessage"

export type TDisruptionMessage = {
  message: TrainMessage
}

export const DisruptionMessage = ({ message }: TDisruptionMessage) => {
  const [displayAdditionalInformation, set_displayAdditionalInformation] = useState(false)

  const header = message.Header
  const [subHeader, ...content] = message.ExternalDescription?.split(":") ?? []
  const subHeaderShouldBeVisible = content.length > 0

  return (
    <div className="flex flex-col items-center border-b border-white/25 dark:border-slate-900/50">
      <button
        className="px-4 py-2 max-w-md w-full flex flex-row justify-between items-center"
        onClick={() => set_displayAdditionalInformation((prev) => !prev)}
      >
        <div>
          <h2 className="text-left text-md font-semibold text-gray-900">{header}</h2>
          {subHeaderShouldBeVisible && <p className="text-left text-sm text-gray-900">{subHeader}</p>}
        </div>
        <div className={`${displayAdditionalInformation ? "" : "rotate-[180deg]"}`}>
          <Chevron width={18} height={18} />
        </div>
      </button>

      {displayAdditionalInformation && (
        <div className="max-w-md w-full flex flex-row items-center">
          <div className="max-w-md w-full px-4 py-2">
            <p className="mb-2 text-left text-sm text-gray-900">
              <strong>Planerat att lösas: </strong>
              <time className="capitalize" dateTime={dayjs(message.PrognosticatedEndDateTimeTrafficImpact).format()}>
                {dayjs(message.PrognosticatedEndDateTimeTrafficImpact).format("dddd MMM DD [(]YYYY-MM-DD[)] HH:mm")}
              </time>
            </p>

            <p className="mb-2 text-left text-sm text-gray-900">
              {subHeaderShouldBeVisible ? content.join(":") : subHeader}
            </p>

            <p className="text-left text-sm text-gray-900">
              <strong>Publicerat: </strong>
              <time className="capitalize" dateTime={dayjs(message.StartDateTime).format()}>
                {dayjs(message.StartDateTime).format("dddd MMM DD [(]YYYY-MM-DD[)] HH:mm")}
              </time>
            </p>
            <p className="text-left text-sm text-gray-900">
              <strong>Senast uppdaterad: </strong>
              <time className="capitalize" dateTime={dayjs(message.ModifiedTime).format()}>
                {dayjs(message.ModifiedTime).format("dddd MMM DD [(]YYYY-MM-DD[)] HH:mm")}
              </time>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
