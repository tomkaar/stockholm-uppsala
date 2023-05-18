import { stationStockholm, stationUppsala } from "@/constants/stations";
import dayjs from "dayjs";
import { getTrains } from "@/utils/getTrains";
import { TrainCard } from "./components/TrainCard/TrainCard";
import { PreviousTrainsAnnouncements } from "./components/PreviousTrainsAnnouncements";
import { groupTrainAnnouncements } from "@/utils/groupTrainAnnouncements";
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams";

export const revalidate = 10;

interface ITrainsPage {
  params: TrainInformationRouteParams;
};

export default async function Home({ params }: ITrainsPage) {
  const fromStation = params?.from ?? stationStockholm;
  const toStation = params?.to ?? stationUppsala;
  const selectedDay = params?.day ?? dayjs().format("YYYY-MM-DD");

  const { date, trains } = await getTrains(fromStation, toStation, selectedDay);

  const { previousTrains, upcomingTrains } = groupTrainAnnouncements(trains)

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col gap-2 max-w-md w-full my-6 mt-2 mb-4">
        <div className="self-end text-xs text-slate-900/50 dark:text-slate-300/75">
          Hämtad: {dayjs(date).format("HH:mm:ss")}
        </div>

        <PreviousTrainsAnnouncements announcements={previousTrains} />

        {upcomingTrains.map((announcement) => (
          <TrainCard
            key={announcement.ActivityId}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
};
