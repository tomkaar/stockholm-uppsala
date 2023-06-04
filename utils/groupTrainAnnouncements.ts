import { TrainAnnouncement } from "@/types/TrainAnnouncement";
import dayjs from "dayjs";

export const groupTrainAnnouncements = ({
  trains,
}: {
  trains: TrainAnnouncement[];
}) => {
  const groupedByAdvertisedTrainIdent = groupByAdvertisedTrainIdent(trains);

  const entries = Object.entries(groupedByAdvertisedTrainIdent);

  const groupedByArrivalAndDeparture = entries.reduce<
    {
      AdvertisedTrainIdent: string;
      departure: TrainAnnouncement;
      arrival?: TrainAnnouncement;
    }[]
  >((acc, group) => {
    const [AdvertisedTrainIdent, groupedTrains] = group;
    const departure = groupedTrains.find(
      (train) =>
        train.LocationSignature === "U" && train.ActivityType === "Avgang"
    );
    const arrival = groupedTrains.find(
      (train) =>
        train.LocationSignature === "Cst" && train.ActivityType === "Ankomst"
    );

    if (departure === undefined) {
      return acc;
    }

    return [...acc, { AdvertisedTrainIdent, departure, arrival }];
  }, []);

  const sortedByDeparture = groupedByArrivalAndDeparture.sort((a, b) => {
    return (
      new Date(a.departure.AdvertisedTimeAtLocation ?? new Date()).getTime() -
      new Date(b.departure.AdvertisedTimeAtLocation ?? new Date()).getTime()
    );
  });

  const groupedTrains = sortedByDeparture.reduce<{
    previous: typeof sortedByDeparture;
    upcoming: typeof sortedByDeparture;
  }>(
    (acc, group) => {
      const time =
        group.departure.EstimatedTimeAtLocation ??
        group.departure.AdvertisedTimeAtLocation;
      const timeHasPassed = dayjs(time).add(10, "minute").isBefore(dayjs());
      const timeAtLocationIsSet = group.departure.TimeAtLocation;

      const trainHasPassed = timeHasPassed || timeAtLocationIsSet;

      if (trainHasPassed) acc.previous.push(group);
      else acc.upcoming.push(group);

      return acc;
    },
    { previous: [], upcoming: [] }
  );

  return {
    previousTrains: groupedTrains.previous,
    upcomingTrains: groupedTrains.upcoming,
  };
};

export interface IgroupByAdvertisedTrainIdent {
  [key: string]: TrainAnnouncement[];
}

function groupByAdvertisedTrainIdent(trains: TrainAnnouncement[]) {
  return trains.reduce<IgroupByAdvertisedTrainIdent>((group, train) => {
    const { AdvertisedTrainIdent } = train;
    if (!AdvertisedTrainIdent) return group;
    group[AdvertisedTrainIdent] = group[AdvertisedTrainIdent] ?? [];
    group[AdvertisedTrainIdent].push(train);
    return group;
  }, {});
}
