import { IGroupedByStation } from "@/app/api/train/route"
import getStationName from "@/utils/getStationName"

interface GroupedStations {
  stations?: IGroupedByStation[]
  isCommuterTrain?: boolean
  from: string
  to: string
}

export const groupedStations = ({ stations, isCommuterTrain, from, to }: GroupedStations) => {
  const fromStation = isCommuterTrain ? getStationName(from)?.pendeltåg : getStationName(from)?.tåg
  const toStation = isCommuterTrain ? getStationName(to)?.pendeltåg : getStationName(to)?.tåg

  if (!stations) {
    return {
      relevantStations: [],
      previousStations: [],
      upcomingStations: [],
    }
  }

  return stations.reduce<{
    relevantStations: IGroupedByStation[]
    previousStations: IGroupedByStation[]
    upcomingStations: IGroupedByStation[]
  }>(
    (acc, cur, idx, arr) => {
      const departureStationExists = !!arr.find((item) => item.station === fromStation)
      const arrivalStationExists = !!arr.find((item) => item.station === toStation)

      const isBeforeFromStation = idx < arr.findIndex((item) => item.station === fromStation)
      const isAfterToStation = idx > arr.findIndex((item) => item.station === toStation)

      if (departureStationExists && arrivalStationExists) {
        if (isBeforeFromStation) acc.previousStations.push(cur)
        else if (isAfterToStation) acc.upcomingStations.push(cur)
        else acc.relevantStations.push(cur)
      } else if (departureStationExists) {
        if (isBeforeFromStation) acc.previousStations.push(cur)
        else acc.relevantStations.push(cur)
      } else if (arrivalStationExists) {
        if (isAfterToStation) acc.upcomingStations.push(cur)
        else acc.relevantStations.push(cur)
      } else {
        acc.relevantStations.push(cur)
      }

      return acc
    },
    {
      relevantStations: [],
      previousStations: [],
      upcomingStations: [],
    }
  )
}
