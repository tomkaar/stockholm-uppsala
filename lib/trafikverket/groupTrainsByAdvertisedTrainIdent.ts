import { TrainAnnouncement } from "@/types/TrainAnnouncement"

export interface IgroupByAdvertisedTrainIdent {
  [key: string]: TrainAnnouncement[]
}

/**
 * Group trains by the "AdventisedTrainIdent"-field
 */
export function groupByAdvertisedTrainIdent(trains: TrainAnnouncement[]) {
  return trains.reduce<IgroupByAdvertisedTrainIdent>((group, train) => {
    const { AdvertisedTrainIdent } = train
    if (!AdvertisedTrainIdent) return group
    group[AdvertisedTrainIdent] = group[AdvertisedTrainIdent] ?? []
    group[AdvertisedTrainIdent].push(train)
    return group
  }, {})
}
