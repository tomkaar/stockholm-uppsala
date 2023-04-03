import { ChevronLeft } from "@/assets/icons/ChevronLeft"
import { ChevronRight } from "@/assets/icons/ChevronRight"
import { stationUppsala, stationStockholm } from "@/constants/stations"
import { TrainAnnouncement } from "@/types/TrainAnnouncement"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"

export interface INavigation {
  announcements: TrainAnnouncement[]
}

export const Navigation = ({}: INavigation) => {
  const router = useRouter()
  const { query } = router

  const selectedDay = dayjs(Array.isArray(query.selectedDay) ? query.selectedDay[0] : query.selectedDay ?? new Date())

  const previousDayQuery = { ...query, selectedDay : selectedDay.subtract(1, "day").format("YYYY-MM-DD") }
  const previousDayQueryString = '?' + new URLSearchParams(previousDayQuery).toString()
  const previousDayDisabled = dayjs(selectedDay).isBefore(dayjs().add(1, "day"), "day")

  const nextDayQuery = { ...query, selectedDay : selectedDay.add(1, "day").format("YYYY-MM-DD") }
  const nextDayQueryString = '?' + new URLSearchParams(nextDayQuery).toString()

  const todayQuery = { ...query, selectedDay : dayjs().format("YYYY-MM-DD") }
  const todayQueryString = '?' + new URLSearchParams(todayQuery).toString()

  const fromStation = Array.isArray(query.from) ? query.from[0] : query.from ?? stationUppsala

  const trainDirection = fromStation === stationUppsala ? "right" : "left"
  const flipStation = {...query, from: trainDirection === "right" ? stationStockholm : stationUppsala, to: trainDirection === "right" ? stationUppsala : stationStockholm }
  const flipStationString = '?' + new URLSearchParams(flipStation).toString()

  return (
    <nav className='sticky z-10 top-0 bg-white dark:bg-slate-900'>
      <div className='py-4 px-4 border-b border-slate-900/10 dark:border-slate-700'>
        <h1 className='text-slate-900 dark:text-white text-xl tracking-light text-center font-bold'>
          Stockholm &nbsp;
          <Link href={flipStationString}>
            <span className={`inline-block ${trainDirection === "left" ? "scale-x-[-1]" : ""}`}>🚂</span>
          </Link>
          &nbsp; Uppsala
        </h1>
      </div>

      <div className='py-2 px-4 border-b border-slate-900/10 dark:border-slate-700 flex justify-center text-black dark:text-white gap-4'>
        {previousDayDisabled ? (
          <div className='text-black/25 dark:text-white/25'>
            <ChevronLeft />
          </div>
        ) : (
        <Link href={previousDayQueryString}>
          <ChevronLeft />
        </Link>
        )}

        <Link href={todayQueryString} className='capitalize'>
          {selectedDay.format("dddd MMM DD")}
        </Link>

        <Link href={nextDayQueryString}>
          <ChevronRight />
        </Link>
      </div>
    </nav>
  )
}
