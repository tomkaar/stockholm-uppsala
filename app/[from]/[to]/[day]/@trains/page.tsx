import dayjs from "dayjs";
import { getTrains } from "@/lib/trafikverket/train/getTrains";
import { TrainCard } from "./components/TrainCard/TrainCard";
import { PreviousTrainsAnnouncements } from "./components/PreviousTrainsAnnouncements";
import { groupTrainAnnouncements } from "@/utils/groupTrainAnnouncements";
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams";
import { getCommuterTrains } from "@/lib/trafikverket/commuterTrains/getCommuterTrains";
import getStationName from "@/utils/getStationName";
import { filterTrains } from "@/utils/filterTrains";
import { PartialFetchError } from "./components/PartialFetchError";

export const revalidate = 10;

interface ITrainsPage {
  params: TrainInformationRouteParams;
};

export default async function Home({ params }: ITrainsPage) {
  const fromStation = getStationName(params?.from)
  const toStation = getStationName(params?.to)

  if (!fromStation || !toStation) return null

  const selectedDay = params?.day ?? dayjs().format("YYYY-MM-DD");

  const [
    { date, trains, error },
    { trains: commuterTrains, error: commuterTrainsError }
  ] = await Promise.all([
    getTrains(fromStation.tåg, toStation.tåg, selectedDay),
    getCommuterTrains(fromStation.pendeltåg, toStation.pendeltåg, selectedDay)
  ])

  if (error && commuterTrainsError) {
    throw new Error("Unable to fetch trains")
  }

  const filteredTrains = filterTrains([...trains, ...commuterTrains]);
  const { previousTrains, upcomingTrains } = groupTrainAnnouncements({ trains: filteredTrains, fromStation, toStation })

  return (
    <div className="flex flex-row justify-center px-4">
      <div className="flex flex-col gap-2 max-w-md w-full my-6 mt-2 mb-4">
        <div className="self-end text-xs text-slate-900/50 dark:text-slate-300/75">
          Hämtad: {dayjs(date).format("HH:mm:ss")}
        </div>

        {(error || commuterTrainsError) && (
          <PartialFetchError />
        )}

        <PreviousTrainsAnnouncements announcements={previousTrains} />

        {upcomingTrains.map((announcement) => (
          <TrainCard
            key={announcement.AdvertisedTrainIdent}
            departure={announcement.departure}
            arrival={announcement.arrival}
          />
        ))}
      </div>
    </div>
  );
};
