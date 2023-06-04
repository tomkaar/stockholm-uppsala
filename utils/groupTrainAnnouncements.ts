import dayjs from "dayjs"

import { groupByAdvertisedTrainIdent } from "@/lib/trafikverket/groupTrainsByAdvertisedTrainIdent"
import { groupTrainsByArrivalAndDeparture } from "@/lib/trafikverket/groupTrainsByArrivalAndDeparture"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"

export const groupTrainAnnouncements = ({
  trains,
  fromStation,
  toStation,
}: {
  trains: TrainAnnouncement[]
  fromStation: { tåg: string; pendeltåg: string }
  toStation: { tåg: string; pendeltåg: string }
}) => {
  const groupedByAdvertisedTrainIdent = groupByAdvertisedTrainIdent(trains)

  const groupedByArrivalAndDeparture = groupTrainsByArrivalAndDeparture({
    groupedTrains: groupedByAdvertisedTrainIdent,
    fromStation,
    toStation,
  })

  const sortedByDeparture = groupedByArrivalAndDeparture.sort((a, b) => {
    return (
      new Date(a.departure.AdvertisedTimeAtLocation ?? new Date()).getTime() -
      new Date(b.departure.AdvertisedTimeAtLocation ?? new Date()).getTime()
    )
  })

  const groupedTrains = sortedByDeparture.reduce<{
    previous: typeof sortedByDeparture
    upcoming: typeof sortedByDeparture
  }>(
    (acc, group) => {
      const time = group.departure.EstimatedTimeAtLocation ?? group.departure.AdvertisedTimeAtLocation
      const timeHasPassed = dayjs(time).add(10, "minute").isBefore(dayjs())
      const timeAtLocationIsSet = group.departure.TimeAtLocation

      const trainHasPassed = timeHasPassed || timeAtLocationIsSet

      if (trainHasPassed) acc.previous.push(group)
      else acc.upcoming.push(group)

      return acc
    },
    { previous: [], upcoming: [] }
  )

  return {
    previousTrains: groupedTrains.previous,
    upcomingTrains: groupedTrains.upcoming,
  }
}
