import dayjs from "dayjs"

// import { getDistruptionMessages } from "@/lib/trafikverket/distruptionMessages/getDistruptionMessages"
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams"
import getStationName from "@/utils/getStationName"

// import { DisruptionMessage } from "./components/DisruptionMessage"

interface IDistruptionMessagesPage {
  params: Promise<TrainInformationRouteParams>
}

export default async function DistruptionMessages({ params }: IDistruptionMessagesPage) {
  const resolvedParams = await params
  const fromStation = getStationName(resolvedParams?.from)
  const day = resolvedParams.day ?? dayjs()
  if (!fromStation) return null

  return null

  // console.log("before messages")
  // const messages = await getDistruptionMessages(fromStation.tåg)
  // console.log("messages", messages)

  // const visibleMessages = messages?.filter((message) => {
  //   const hasBeenResolvedOnThisDay =
  //     dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isAfter(day, "day") ||
  //     dayjs(message.PrognosticatedEndDateTimeTrafficImpact).isSame(day, "day")
  //   return hasBeenResolvedOnThisDay
  // })

  // return (
  //   <div className="bg-rose-500 dark:bg-rose-500">
  //     {visibleMessages?.map((message) => <DisruptionMessage key={message.EventId} message={message} />)}
  //   </div>
  // )
}
