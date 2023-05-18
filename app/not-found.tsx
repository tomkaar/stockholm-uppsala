"use client"

import Link from "next/link";
import { ChevronRight } from "@/assets/icons/ChevronRight";
import { stationStockholm, stationUppsala } from "@/constants/stations";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

export const NotFound = () => {
  const pathname = usePathname()
  const [_, _from, _to] = (pathname ?? "")?.split("/")

  const day = dayjs().format("YYYY-MM-DD")
  const { from , to } = getValidStationNamesForRedirect(_from, _to)

  return (
    <div className="flex flex-col justify-center items-center mt-28 mb-20">
      <div className="flex flex-col justify-center items-center p-8">
      <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">404</h2>

      <div className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Kan inte hitta sidan
      </div>

      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
        Kan inte hitta sidan du letar efter.
      </p>

      <div className="mt-10 flex flex-row gap-2">
        <Link href={`/`} className="relative bg-slate-700 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white h-12 min-h-[48px] px-8 rounded-lg flex items-center pointer-events-auto">
          Hem
        </Link>
        <Link href={`/${from}/${to}/${day}`} className="relative hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-slate-600 dark:text-white hover:text-white h-12 min-h-[48px] pl-8 pr-4 rounded-lg flex items-center pointer-events-auto">
          Dagens tidtabell
          <div className="ml-1">
            <ChevronRight width="20" height="20" />
          </div>
        </Link>
      </div>
      </div>
    </div>
  )
}

const getValidStationNamesForRedirect = (_from: string, _to: string) => {
  const fromValueIsvalid = [stationStockholm, stationUppsala].includes(_from)
  const toValueIsvalid = [stationStockholm, stationUppsala].includes(_to)
  const toAndFromAreNotTheSame = _from !== _to

  if (fromValueIsvalid && toValueIsvalid && toAndFromAreNotTheSame) {
    return { from: _from, to: _to }
  }

  return { from: stationStockholm, to: stationUppsala }
}

export default NotFound
