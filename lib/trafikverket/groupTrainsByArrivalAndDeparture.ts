import { TrainAnnouncement } from "@/types/TrainAnnouncement"

export interface IgroupTrainsByArrivalAndDeparture {
  groupedTrains: { [key: string]: TrainAnnouncement[] }
  fromStation: { pendeltåg: string; tåg: string }
  toStation: { pendeltåg: string; tåg: string }
}

export interface ReduceReturnValue {
  AdvertisedTrainIdent: string
  departure: TrainAnnouncement
  arrival?: TrainAnnouncement
}

export function groupTrainsByArrivalAndDeparture({
  groupedTrains,
  fromStation,
  toStation,
}: IgroupTrainsByArrivalAndDeparture) {
  const entries = Object.entries(groupedTrains)
  return entries.reduce<ReduceReturnValue[]>((acc, group) => {
    const [AdvertisedTrainIdent, groupedTrains] = group

    const departure = groupedTrains.find((train) => {
      const isPendeltag = trainIsCommuterTrain(train)
      const location = isPendeltag ? fromStation.pendeltåg : fromStation.tåg
      return train.LocationSignature === location && train.ActivityType === "Avgang"
    })

    const arrival = groupedTrains.find((train) => {
      const isPendeltag = trainIsCommuterTrain(train)
      const location = isPendeltag ? toStation.pendeltåg : toStation.tåg
      return train.LocationSignature === location && train.ActivityType === "Ankomst"
    })

    if (departure === undefined) {
      return acc
    }

    return [...acc, { AdvertisedTrainIdent, departure, arrival }]
  }, [])
}

function trainIsCommuterTrain(train: TrainAnnouncement) {
  return !!train?.TypeOfTraffic?.find((traffic) => traffic.Description === "Pendeltåg")
}
