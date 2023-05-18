'use client'

import { ChevronLeft } from "@/assets/icons/ChevronLeft"
import { ChevronRight } from "@/assets/icons/ChevronRight"
import { stationStockholm, stationUppsala } from "@/constants/stations"
import dayjs from "dayjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

import '@/init/dayjs'

export const Navigation = () => {
  const pathname = usePathname()
  const [_, from, to, day] = (pathname ?? "")?.split("/")

  const fromStation = from ?? stationStockholm
  const toStation = to ?? stationUppsala
  const selectedDay = day ?? dayjs().format("YYYY-MM-DD")

  const previousDayString = `/${fromStation}/${toStation}/${dayjs(selectedDay).subtract(1, "day").format("YYYY-MM-DD")}`
  const nextDayString = `/${fromStation}/${toStation}/${dayjs(selectedDay).add(1, "day").format("YYYY-MM-DD")}`
  const todayDayString = `/${fromStation}/${toStation}/${dayjs().format("YYYY-MM-DD")}`
  
  const previousDayDisabled = dayjs(selectedDay).isBefore(dayjs().add(1, "day"), "day")

  return (
    <nav className="sticky top-[61px] z-20 flex flex-row justify-center gap-2 py-2 px-4 bg-white dark:bg-slate-900 border-b border-slate-900/10 dark:border-slate-700 text-black dark:text-white">
      {previousDayDisabled ? (
        <div className='text-black/25 dark:text-white/25'>
          <ChevronLeft />
        </div>
      ): (
        <Link prefetch={false} href={previousDayString} aria-label={`Föregående dag (${dayjs(day).format("YYYY-MM-DD")})`}>
          <ChevronLeft />
        </Link>
      )}

      <Link prefetch={false} className='capitalize' href={todayDayString}>
        {dayjs(day).format("dddd MMM DD")}
      </Link>

      <Link prefetch={false} href={nextDayString} aria-label={`Nästa dag (${dayjs(day).format("YYYY-MM-DD")})`}>
        <ChevronRight />
      </Link>
    </nav>
  )
}
