import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import { useState } from "react"
import { TrainCard } from "./TrainCard"

export interface IPreviousTrainsAnnouncements {
  announcements: TrainAnnouncement[]
}

export const PreviousTrainsAnnouncements = ({ announcements }: IPreviousTrainsAnnouncements) => {
  const [displayPreviousTrains, set_displayPreviousTrains] = useState(false)

  const previousTrainAnnouncements = announcements
    ?.filter(announcement => announcement.TimeAtLocation)
    .sort((a, b) => new Date(a.AdvertisedTimeAtLocation ?? '').getTime() - new Date(b.AdvertisedTimeAtLocation ?? '').getTime())

  return (
    <>
      {!!previousTrainAnnouncements?.length && (
        <>
          <button
            className='mb-4 text-base text-slate-900/50 dark:text-slate-300/50'
            onClick={() => set_displayPreviousTrains(prev => !prev)}
          >
            {displayPreviousTrains ? "Göm tidigare avgångar" : "Se tidigare avgångar"}
          </button>

          {displayPreviousTrains && previousTrainAnnouncements?.map(announcement => (
            <TrainCard key={announcement.ActivityId} announcement={announcement} />
          ))}
        </>
      )}
    </>
  )
}
