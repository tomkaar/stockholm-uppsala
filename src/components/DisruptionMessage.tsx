import { ChevronLeft } from "@/assets/icons/ChevronLeft"
import { TrainMessage } from "@/types/TrainMessage"
import dayjs from "dayjs"
import { useState } from "react"

export type TDisruptionMessage = {
  message: TrainMessage
}

export const DisruptionMessage = ({ message }: TDisruptionMessage) => {
  const [displayAdditionalInformation, set_displayAdditionalInformation] = useState(false)

  const header = message.Header
  const [subHeader, ...content] = message.ExternalDescription?.split(':') ?? []

  return (
    <div className='flex flex-col items-center border-b border-white/25 dark:border-slate-900/50'>
      <button className="px-4 py-2 max-w-md w-full flex flex-row justify-between items-center" onClick={() => set_displayAdditionalInformation(prev => !prev)}>
        <div>
          <h2 className="text-left text-md font-semibold text-gray-900">{header}</h2>
          <p className="text-left text-sm text-gray-900">{subHeader}</p>
        </div>
        <div className="rotate-[-90deg]">
          <ChevronLeft />
        </div>
      </button>

      {displayAdditionalInformation && (
        <div className="max-w-md w-full flex flex-row items-center">
          <div className="max-w-md w-full px-4 py-2">
            <p className="mb-2 text-left text-sm text-gray-900">{content.join(':')}</p>
            <p className="text-left text-sm text-gray-900">
              <strong>Publicerad: </strong>
              <time>{dayjs(message.StartDateTime).format("YYYY-MM-DD HH:mm")}</time>
            </p>
            <p className="text-left text-sm text-gray-900">
              <strong>Senast uppdaterad: </strong>
              <time>{dayjs(message.ModifiedTime).format("YYYY-MM-DD HH:mm")}</time>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}