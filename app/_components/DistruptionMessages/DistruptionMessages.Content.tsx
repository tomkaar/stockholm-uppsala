import "server-only"

import { use } from "react";
import { DisruptionMessage } from "./DisruptionMessage";
import { getMessages } from "../../../utils/getMessages";
import { stationStockholm } from "@/constants/stations";
import dayjs from "dayjs";

export const Content = ({ from, day }: { from: string; day: string }) => {
  const fromStataion = from ?? stationStockholm
  const messages = use(getMessages(fromStataion))

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
