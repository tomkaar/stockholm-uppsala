import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import dayjs from "dayjs"

export interface ReducerReturn {
  previous: TrainAnnouncement[]
  upcoming: TrainAnnouncement[]
}

export const groupTrainAnnouncements = (announcements: TrainAnnouncement[]) => {
  const { previous, upcoming } = announcements.reduce<ReducerReturn>((acc, announcement) => {
    const timeHasPassed = dayjs(announcement.EstimatedTimeAtLocation ?? announcement.AdvertisedTimeAtLocation)
      .add(10, "minute")
      .isBefore(dayjs())
    const timeAtLocationIsSet = announcement.TimeAtLocation

    const trainHasPassed = timeHasPassed || timeAtLocationIsSet

    if (trainHasPassed) acc.previous.push(announcement)
    else acc.upcoming.push(announcement)

    return acc
  }, { previous: [], upcoming: [] })

  const sortedPreviousTrains = previous.sort((a, b) =>
        new Date(a.EstimatedTimeAtLocation ?? a.AdvertisedTimeAtLocation ?? "").getTime() -
        new Date(b.EstimatedTimeAtLocation ?? b.AdvertisedTimeAtLocation ?? "").getTime())

  const sortedUpcomingTrains = upcoming.sort((a, b) =>
        new Date(a.EstimatedTimeAtLocation ?? a.AdvertisedTimeAtLocation ?? "").getTime() -
        new Date(b.EstimatedTimeAtLocation ?? b.AdvertisedTimeAtLocation ?? "").getTime())

  return { previousTrains: sortedPreviousTrains, upcomingTrains: sortedUpcomingTrains }
}
