import "server-only"

import { stationStockholm, stationUppsala } from "@/constants/stations";
import dayjs from "dayjs";
import { getTrains } from "../../../../utils/getTrains";
import { TrainCard } from "../../../_components/TrainCard/TrainCard";
import { PreviousTrainsAnnouncements } from "../../../_components/PreviousTrainsAnnouncements";
import { filterTrainAnnouncements } from "../../../_utils/filterTrainAnnouncements";
import { RefreshTrainsButton } from "../../../_components/RefreshTrainsButton";
import { SwitchDestinationButton } from "../../../_components/SwitchDestinationButton";

export const revalidate = 30;

const Home = async ({ params, ...props }: any) => {
  const fromStation = params?.from ?? stationStockholm;
  const toStation = params?.to ?? stationUppsala;
  const selectedDay = params?.day ?? dayjs().format("YYYY-MM-DD");

  const res = await getTrains(fromStation, toStation, selectedDay);

  const { previousTrains, upcomingTrains } = filterTrainAnnouncements(res)

  return (
    <main>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col gap-2 max-w-md w-full my-6 mx-4">
          <PreviousTrainsAnnouncements announcements={previousTrains} />

          {upcomingTrains.map((announcement) => (
            <TrainCard
              key={announcement.ActivityId}
              announcement={announcement}
            />
          ))}
        </div>
      </div>

      <SwitchDestinationButton from={fromStation} to={toStation} day={selectedDay} />
      <RefreshTrainsButton />
    </main>
  );
};

export default Home;
