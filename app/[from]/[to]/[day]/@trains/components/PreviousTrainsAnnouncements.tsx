"use client"

import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { useState } from "react"
import { TrainCard } from "./TrainCard/TrainCard"

export interface IPreviousTrainsAnnouncements {
  announcements: TrainAnnouncement[]
}

export const PreviousTrainsAnnouncements = ({ announcements }: IPreviousTrainsAnnouncements) => {
  const [displayPreviousTrains, set_displayPreviousTrains] = useState(false)

  return (
    <>
      {!!announcements?.length && (
        <>
          <button
            className='mb-4 text-base text-slate-900/50 dark:text-slate-300/75'
            onClick={() => set_displayPreviousTrains(prev => !prev)}
          >
            {displayPreviousTrains ? "Göm tidigare avgångar" : "Se tidigare avgångar"}
          </button>

          {displayPreviousTrains && (
            <>
              {announcements?.map(announcement => (
                <TrainCard key={announcement.ActivityId} announcement={announcement} isDisabled />
              ))}

              <div className="my-4 h-1 rounded-full bg-slate-50 dark:bg-slate-800" />
            </>
          )}
        </>
      )}
    </>
  )
}
