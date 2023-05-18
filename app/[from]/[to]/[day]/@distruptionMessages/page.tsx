import { stationStockholm } from "@/constants/stations";
import dayjs from "dayjs";
import { getMessages } from "@/utils/getMessages";
import { DisruptionMessage } from "./components/DisruptionMessage";
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams";

interface IDistruptionMessagesPage {
  params: TrainInformationRouteParams;
};

export default async function DistruptionMessages({ params }: IDistruptionMessagesPage) {
  const fromStataion = params.from ?? stationStockholm
  const day = params.day ?? dayjs()
  const messages = await getMessages(fromStataion)

  const visibleMessages = messages?.filter(message => {
    const hasBeenResolvedOnThisDay = dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isAfter(day, "day") || dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isSame(day, "day")
    return hasBeenResolvedOnThisDay
  })

  return (
    <div className='bg-rose-500 dark:bg-rose-500'>
      {visibleMessages?.map(message => (
        <DisruptionMessage key={message.EventId} message={message} />
      ))}
    </div>
  )
}
