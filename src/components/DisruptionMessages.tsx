import { useFetchMessages } from "@/hooks/useFetchMessages"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import { DisruptionMessage } from "./DisruptionMessage"
import { stationUppsala } from "@/constants/stations"

export const DisruptionMessages = () => {
  const router = useRouter()
  const { query } = router

  const fromStation = Array.isArray(query.from) ? query.from[0] : query.from ?? stationUppsala

  const selectedDay = dayjs(Array.isArray(query.selectedDay) ? query.selectedDay[0] : query.selectedDay ?? new Date())
  const selectedDayIsToday = dayjs(selectedDay).isSame(new Date(), "day")

  const { data: messageData } = useFetchMessages({ station: fromStation })

  return (
    <>
      {selectedDayIsToday && !!messageData?.length && (
        <div className='bg-rose-500 dark:bg-rose-500'>
          {messageData.map(message => (
            <DisruptionMessage key={message.EventId} message={message} />
          ))}
        </div>
      )}
    </>
  )
}