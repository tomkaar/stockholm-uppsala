import dayjs from "dayjs"

import { getTrainMessages } from "@/lib/trafikverket/trainMessages/getTrainMessages"
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams"
import getStationName from "@/utils/getStationName"

import { DisruptionMessage } from "./components/DisruptionMessage"

interface IDistruptionMessagesPage {
  params: TrainInformationRouteParams
}

export default async function DistruptionMessages({ params }: IDistruptionMessagesPage) {
  const fromStation = getStationName(params?.from)
  const day = params.day ?? dayjs()
  if (!fromStation) return null
  const messages = await getTrainMessages(fromStation.tåg)

  const visibleMessages = messages?.filter((message) => {
    const hasBeenResolvedOnThisDay =
      dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isAfter(day, "day") ||
      dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isSame(day, "day")
    return hasBeenResolvedOnThisDay
  })

  return (
    <div className="bg-rose-500 dark:bg-rose-500">
      {visibleMessages?.map((message) => (
        <DisruptionMessage key={message.EventId} message={message} />
      ))}
    </div>
  )
}
